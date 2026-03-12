"use server";

import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * 도서에 대한 새로운 노트를 생성합니다.
 * @param {Object} data - 노트 데이터
 * @param {string} data.bookId - 도서 ID
 * @param {string} data.content - 노트 내용
 * @param {string} [data.highlight] - 인상 깊은 문장
 * @param {number} [data.pageNumber] - 페이지 번호
 * @param {string} [data.chapter] - 챕터 정보
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function createNote(data: { 
  bookId: string; 
  content: string; 
  highlight?: string; 
  pageNumber?: number; 
  chapter?: string; 
}) {
  const id = randomUUID();
  await db.insert(notes).values({
    id,
    ...data,
  });
  return { success: true };
}

/**
 * 특정 도서의 모든 노트를 조회합니다. 최신순으로 정렬됩니다.
 * @param {string} bookId - 도서 ID
 * @returns {Promise<Array>} 노트 목록
 */
export async function getNotes(bookId: string) {
  return await db.select()
    .from(notes)
    .where(eq(notes.bookId, bookId))
    .orderBy(desc(notes.createdAt));
}

/**
 * 특정 노트를 삭제합니다.
 * @param {string} noteId - 노트 ID
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function deleteNote(noteId: string) {
  await db.delete(notes).where(eq(notes.id, noteId));
  return { success: true };
}