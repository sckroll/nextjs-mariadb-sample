import Link from "next/link";
import { getBooks } from "@/actions/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookCard from "@/components/books/BookCard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const books = await getBooks(session.user.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 서재</h2>
        <Link href="/dashboard/books/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          책 추가
        </Link>
      </div>
      
      {books.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white/50 flex flex-col items-center justify-center h-48 text-gray-400">
          <p className="mb-2">아직 등록된 책이 없습니다.</p>
          <Link href="/dashboard/books/new" className="text-blue-500 hover:underline">첫 책 등록하기</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book as any} />
          ))}
        </div>
      )}
    </div>
  );
}