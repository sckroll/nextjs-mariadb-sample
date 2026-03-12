import Link from "next/link";
import { getBooks } from "@/actions/book";
import { createTag, deleteTag, getTags } from "@/actions/tag";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookCard from "@/components/books/BookCard";
import SearchFilter from "@/components/dashboard/SearchFilter";
import TagManager from "@/components/tags/TagManager";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

/**
 * 사용자의 메인 서재 대시보드 페이지입니다.
 * 도서 목록 표시, 검색, 필터링 및 태그 관리 기능을 제공합니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Promise<{ search?: string, status?: string, tagId?: string }>} props.searchParams - URL 쿼리 파라미터
 * @returns {Promise<JSX.Element>} 대시보드 페이지 UI
 */
export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ search?: string, status?: string, tagId?: string }> 
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedSearchParams = await searchParams;
  const [books, tags] = await Promise.all([
    getBooks(session.user.id, {
      search: resolvedSearchParams.search,
      status: resolvedSearchParams.status,
      tagId: resolvedSearchParams.tagId,
    }),
    getTags(session.user.id)
  ]);

  const handleCreateTag = async (name: string, color: string) => {
    "use server";
    await createTag(session.user.id, { name, color });
    revalidatePath("/dashboard");
  };

  const handleDeleteTag = async (id: string) => {
    "use server";
    await deleteTag(id);
    revalidatePath("/dashboard");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">내 서재</h2>
        <Link href="/dashboard/books/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          책 추가
        </Link>
      </div>
      
      <TagManager tags={tags as any} onCreate={handleCreateTag} onDelete={handleDeleteTag} />

      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg mb-8" />}>
        <SearchFilter tags={tags as any} />
      </Suspense>
      
      {books.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white/50 flex flex-col items-center justify-center h-48 text-gray-400">
          <p className="mb-2">검색 결과가 없거나 아직 등록된 책이 없습니다.</p>
          {!resolvedSearchParams.search && !resolvedSearchParams.status && !resolvedSearchParams.tagId && (
            <Link href="/dashboard/books/new" className="text-blue-500 hover:underline">첫 책 등록하기</Link>
          )}
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