"use server";

import { db } from "@/db";
import { books, readingProgress } from "@/db/schema";
import { eq, and, sql, gte, lte } from "drizzle-orm";

/**
 * 특정 월의 독서 통계를 조회합니다.
 * @param {string} userId - 사용자 ID
 * @param {number} year - 조회 연도
 * @param {number} month - 조회 월 (1-12)
 * @returns {Promise<Object>} 통계 데이터 (완독 수, 읽은 페이지 수, 평균 평점)
 */
export async function getMonthlyStatistics(userId: string, year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  // 1. 해당 월에 완독한 책 수 및 평균 평점
  const completedBooks = await db.select({
    count: sql<number>`count(*)`,
    avgRating: sql<number>`avg(CAST(${books.rating} AS DECIMAL(2,1)))`,
  })
    .from(books)
    .where(and(
      eq(books.userId, userId),
      eq(books.status, "COMPLETED"),
      gte(books.endDate, startDate.toISOString().split('T')[0]),
      lte(books.endDate, endDate.toISOString().split('T')[0])
    ));

  // 2. 해당 월에 읽은 총 페이지 수
  const pagesResult = await db.select({
    total: sql<number>`sum(${readingProgress.readPages})`,
  })
    .from(readingProgress)
    .innerJoin(books, eq(readingProgress.bookId, books.id))
    .where(and(
      eq(books.userId, userId),
      gte(readingProgress.recordedDate, startDate.toISOString().split('T')[0]),
      lte(readingProgress.recordedDate, endDate.toISOString().split('T')[0])
    ));

  return {
    booksCompleted: completedBooks[0]?.count || 0,
    averageRating: Number(completedBooks[0]?.avgRating || 0).toFixed(1),
    pagesRead: pagesResult[0]?.total || 0,
  };
}

/**
 * 특정 월의 날짜별 독서량 데이터를 조회합니다. (캘린더용)
 * @param {string} userId - 사용자 ID
 * @param {number} year - 조회 연도
 * @param {number} month - 조회 월
 * @returns {Promise<Array>} 날짜별 독서량 목록
 */
export async function getDailyReadingLogs(userId: string, year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return await db.select({
    date: readingProgress.recordedDate,
    pages: sql<number>`sum(${readingProgress.readPages})`,
  })
    .from(readingProgress)
    .innerJoin(books, eq(readingProgress.bookId, books.id))
    .where(and(
      eq(books.userId, userId),
      gte(readingProgress.recordedDate, startDate.toISOString().split('T')[0]),
      lte(readingProgress.recordedDate, endDate.toISOString().split('T')[0])
    ))
    .groupBy(readingProgress.recordedDate);
}