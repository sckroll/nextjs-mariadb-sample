import Link from "next/link";
import { type books } from "@/db/schema";

type Book = typeof books.$inferSelect;

export default function BookCard({ book }: { book: Book }) {
  const statusLabel = {
    WISH: "읽고 싶음",
    READING: "읽는 중",
    COMPLETED: "완독"
  }[book.status];

  return (
    <Link href={`/dashboard/books/${book.id}`} className="block border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-gray-600">{book.author || "저자 미상"}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{statusLabel}</span>
    </Link>
  );
}