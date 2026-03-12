"use server";

import { db } from "@/db";
import { goals } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * 새로운 독서 목표를 설정합니다.
 * @param {string} userId - 사용자 ID
 * @param {Object} data - 목표 데이터
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function createGoal(userId: string, data: {
  periodType: "MONTHLY" | "YEARLY";
  targetType: "BOOKS" | "PAGES" | "DAYS";
  targetValue: number;
  startDate: string;
  endDate: string;
}) {
  const id = randomUUID();
  await db.insert(goals).values({
    id,
    userId,
    periodType: data.periodType,
    targetType: data.targetType,
    targetValue: data.targetValue,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
  });
  return { success: true };
}

/**
 * 사용자의 모든 목표 목록을 조회합니다.
 * @param {string} userId - 사용자 ID
 * @returns {Promise<Array>} 목표 목록
 */
export async function getGoals(userId: string) {
  return await db.select()
    .from(goals)
    .where(eq(goals.userId, userId))
    .orderBy(desc(goals.createdAt));
}

/**
 * 설정된 목표를 삭제합니다.
 * @param {string} goalId - 목표 ID
 * @returns {Promise<{ success: boolean }>} 처리 결과
 */
export async function deleteGoal(goalId: string) {
  await db.delete(goals).where(eq(goals.id, goalId));
  return { success: true };
}