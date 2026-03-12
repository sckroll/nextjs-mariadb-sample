import { getBookById } from "@/actions/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id, session.user.id);
  
  if (!book) notFound();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-lg text-gray-600">{book.author || "저자 미상"} | {book.publisher || "출판사 미상"}</p>
        </div>
        <div className="flex gap-2">
           <Link href={`/dashboard/books/${book.id}/edit`} className="px-4 py-2 border rounded hover:bg-gray-50 text-black">수정</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="text-black"><span className="font-semibold">상태:</span> {book.status}</div>
        <div className="text-black"><span className="font-semibold">총 페이지:</span> {book.totalPages} 쪽</div>
      </div>
    </div>
  );
}