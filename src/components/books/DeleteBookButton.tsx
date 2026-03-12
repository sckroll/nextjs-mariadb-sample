"use client";
import { deleteBook } from "@/actions/book";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ bookId, userId }: { bookId: string, userId: string }) {
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm("정말로 이 책을 삭제하시겠습니까? (관련 노트와 기록도 모두 삭제됩니다)")) {
      await deleteBook(userId, bookId);
      router.push("/dashboard");
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">
      삭제
    </button>
  );
}