"use server";

import { db } from "@/db";
import { books, readingProgress } from "@/db/schema";
import { bookSchema } from "@/lib/validations/book";
import { eq, desc, and, like } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function createBook(userId: string, data: import("zod").infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  const id = randomUUID();

  await db.insert(books).values({
    id,
    userId,
    ...validated,
    rating: validated.rating ? validated.rating.toString() : null, // handle decimal type
    startDate: validated.startDate ? new Date(validated.startDate) : null,
    endDate: validated.endDate ? new Date(validated.endDate) : null,
  });

  return { success: true, id };
}

export async function getBooks(userId: string, filters?: { search?: string, status?: string }) {
  let query = db.select().from(books).where(eq(books.userId, userId)).$dynamic();

  if (filters?.status) {
    query = query.where(and(eq(books.userId, userId), eq(books.status, filters.status as any)));
  }

  if (filters?.search) {
    query = query.where(and(eq(books.userId, userId), like(books.title, `%${filters.search}%`)));
  }

  return await query.orderBy(desc(books.createdAt));
}

export async function getBookById(id: string, userId: string) {
  const result = await db.select().from(books).where(and(eq(books.id, id), eq(books.userId, userId)));
  return result[0] || null;
}

export async function updateBook(userId: string, bookId: string, data: import("zod").infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  
  // Get current status to check for transition
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

export async function deleteBook(userId: string, bookId: string) {
  // TODO: Add verification that the book belongs to the userId
  await db.delete(books).where(eq(books.id, bookId));
  return { success: true };
}

export async function resetProgress(bookId: string) {
  await db.delete(readingProgress).where(eq(readingProgress.bookId, bookId));
  return { success: true };
}

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

export async function getLatestProgress(bookId: string) {
  const result = await db.select()
    .from(readingProgress)
    .where(eq(readingProgress.bookId, bookId))
    .orderBy(desc(readingProgress.recordedDate), desc(readingProgress.createdAt))
    .limit(1);
  return result[0] || null;
}