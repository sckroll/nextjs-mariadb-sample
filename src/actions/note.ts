"use server";

import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

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

export async function getNotes(bookId: string) {
  return await db.select()
    .from(notes)
    .where(eq(notes.bookId, bookId))
    .orderBy(desc(notes.createdAt));
}

export async function deleteNote(noteId: string) {
  await db.delete(notes).where(eq(notes.id, noteId));
  return { success: true };
}