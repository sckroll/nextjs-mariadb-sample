"use server";

import { db } from "@/db";
import { tags, bookTags } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * 새로운 태그를 생성합니다.
 * @param {string} userId - 사용자 ID
 * @param {Object} data - 태그 데이터
 * @param {string} data.name - 태그 이름
 * @param {string} data.color - 태그 색상 (Hex 코드 등)
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function createTag(userId: string, data: { name: string; color: string }) {
  const id = randomUUID();
  await db.insert(tags).values({
    id,
    userId,
    ...data,
  });
  return { success: true };
}

/**
 * 사용자의 모든 태그를 조회합니다. 최신순으로 정렬됩니다.
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Array>} 태그 목록
 */
export async function getTags(userId: string) {
  return await db.select()
    .from(tags)
    .where(eq(tags.userId, userId))
    .orderBy(desc(tags.createdAt));
}

/**
 * 특정 태그를 삭제합니다.
 * @param {string} tagId - 태그 ID
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function deleteTag(tagId: string) {
  await db.delete(tags).where(eq(tags.id, tagId));
  return { success: true };
}

/**
 * 도서에 태그를 할당합니다. 기존 매핑을 삭제하고 새로 등록합니다.
 * @param {string} bookId - 도서 ID
 * @param {string[]} tagIds - 할당할 태그 ID 목록
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function assignTagsToBook(bookId: string, tagIds: string[]) {
  // 기존 매핑 삭제
  await db.delete(bookTags).where(eq(bookTags.bookId, bookId));

  if (tagIds.length > 0) {
    // 새로운 매핑 등록
    const values = tagIds.map(tagId => ({
      bookId,
      tagId,
    }));
    await db.insert(bookTags).values(values);
  }

  return { success: true };
}

/**
 * 특정 도서에 할당된 모든 태그를 조회합니다.
 * @param {string} bookId - 도서 ID
 * @returns {Promise<Array>} 할당된 태그 목록
 */
export async function getBookTags(bookId: string) {
  const result = await db.select({
    id: tags.id,
    name: tags.name,
    color: tags.color,
  })
    .from(bookTags)
    .innerJoin(tags, eq(bookTags.tagId, tags.id))
    .where(eq(bookTags.bookId, bookId));
  
  return result;
}