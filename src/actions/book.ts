"use server";

import { db } from "@/db";
import { books, readingProgress, bookTags } from "@/db/schema";
import { bookSchema } from "@/lib/validations/book";
import { eq, desc, and, like } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * 새로운 도서를 등록합니다.
 * @param {string} userId - 사용자 ID
 * @param {import("zod").infer<typeof bookSchema>} data - 도서 정보
 * @returns {Promise<{ success: boolean, id: string }>} 처리 결과 및 생성된 도서 ID
 */
export async function createBook(userId: string, data: import("zod").infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  const id = randomUUID();

  await db.insert(books).values({
    id,
    userId,
    ...validated,
    rating: validated.rating ? validated.rating.toString() : null,
    startDate: validated.startDate ? new Date(validated.startDate) : null,
    endDate: validated.endDate ? new Date(validated.endDate) : null,
  });

  return { success: true, id };
}

/**
 * 사용자의 도서 목록을 조회합니다. 필터링 기능을 지원합니다.
 * @param {string} userId - 사용자 ID
 * @param {Object} [filters] - 필터 옵션
 * @param {string} [filters.search] - 도서 제목 검색어
 * @param {string} [filters.status] - 도서 읽기 상태
 * @param {string} [filters.tagId] - 태그 ID
 * @returns {Promise<Array>} 도서 목록
 */
export async function getBooks(userId: string, filters?: { search?: string, status?: string, tagId?: string }) {
  let query = db.select({
    id: books.id,
    userId: books.userId,
    title: books.title,
    author: books.author,
    publisher: books.publisher,
    coverImage: books.coverImage,
    totalPages: books.totalPages,
    status: books.status,
    startDate: books.startDate,
    endDate: books.endDate,
    rating: books.rating,
    oneLiner: books.oneLiner,
    createdAt: books.createdAt,
    updatedAt: books.updatedAt,
  })
    .from(books)
    .where(eq(books.userId, userId))
    .$dynamic();

  if (filters?.tagId) {
    query = query
      .innerJoin(bookTags, eq(books.id, bookTags.bookId))
      .where(and(eq(books.userId, userId), eq(bookTags.tagId, filters.tagId)));
  }

  if (filters?.status) {
    query = query.where(and(eq(books.userId, userId), eq(books.status, filters.status as any)));
  }

  if (filters?.search) {
    query = query.where(and(eq(books.userId, userId), like(books.title, `%${filters.search}%`)));
  }

  return await query.orderBy(desc(books.createdAt));
}

/**
 * 특정 도서의 상세 정보를 조회합니다.
 * @param {string} id - 도서 ID
 * @param {string} userId - 사용자 ID (소유권 검증용)
 * @returns {Promise<Object|null>} 도서 정보 또는 null
 */
export async function getBookById(id: string, userId: string) {
  const result = await db.select().from(books).where(and(eq(books.id, id), eq(books.userId, userId)));
  return result[0] || null;
}

/**
 * 도서 정보를 수정합니다. 상태 변경 시 진행률 초기화 로직이 포함되어 있습니다.
 * @param {string} userId - 사용자 ID
 * @param {string} bookId - 도서 ID
 * @param {import("zod").infer<typeof bookSchema>} data - 수정할 도서 정보
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function updateBook(userId: string, bookId: string, data: import("zod").infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  
  const currentBook = await db.select().from(books).where(and(eq(books.id, bookId), eq(books.userId, userId))).limit(1);
  const statusChangedToWish = currentBook[0] && currentBook[0].status !== "WISH" && validated.status === "WISH";

  await db.update(books)
    .set({
      ...validated,
      rating: validated.rating ? validated.rating.toString() : null,
      startDate: validated.startDate ? new Date(validated.startDate) : null,
      endDate: validated.endDate ? new Date(validated.endDate) : null,
      updatedAt: new Date(),
    })
    .where(and(eq(books.id, bookId), eq(books.userId, userId)));

  if (statusChangedToWish) {
    await resetProgress(bookId);
  }

  return { success: true };
}

/**
 * 도서를 삭제합니다.
 * @param {string} userId - 사용자 ID
 * @param {string} bookId - 도서 ID
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function deleteBook(userId: string, bookId: string) {
  await db.delete(books).where(eq(books.id, bookId));
  return { success: true };
}

/**
 * 도서의 모든 독서 진행 기록을 초기화합니다.
 * @param {string} bookId - 도서 ID
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function resetProgress(bookId: string) {
  await db.delete(readingProgress).where(eq(readingProgress.bookId, bookId));
  return { success: true };
}

/**
 * 독서 진행 페이지를 기록합니다.
 * @param {string} bookId - 도서 ID
 * @param {number} readPages - 읽은 페이지 수
 * @param {string} recordedDate - 기록 날짜 (YYYY-MM-DD)
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function updateProgress(bookId: string, readPages: number, recordedDate: string) {
  const book = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
  if (!book[0] || book[0].status === "WISH") {
    throw new Error("읽기 시작한 책만 진행률을 기록할 수 있습니다.");
  }

  const id = randomUUID();
  await db.insert(readingProgress).values({
    id,
    bookId,
    readPages,
    recordedDate: new Date(recordedDate),
  });
  return { success: true };
}

/**
 * 도서의 가장 최근 독서 진행 정보를 조회합니다.
 * @param {string} bookId - 도서 ID
 * @returns {Promise<Object|null>} 최신 진행 정보 또는 null
 */
export async function getLatestProgress(bookId: string) {
  const result = await db.select()
    .from(readingProgress)
    .where(eq(readingProgress.bookId, bookId))
    .orderBy(desc(readingProgress.recordedDate), desc(readingProgress.createdAt))
    .limit(1);
  return result[0] || null;
}