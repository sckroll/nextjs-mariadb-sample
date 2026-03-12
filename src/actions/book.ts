"use server";

import { db } from "@/db";
import { books } from "@/db/schema";
import { bookSchema } from "@/lib/validations/book";
import { eq, desc } from "drizzle-orm";
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

export async function getBooks(userId: string) {
  return await db.select().from(books).where(eq(books.userId, userId)).orderBy(desc(books.createdAt));
}

export async function deleteBook(userId: string, bookId: string) {
  // TODO: Add verification that the book belongs to the userId
  await db.delete(books).where(eq(books.id, bookId));
  return { success: true };
}