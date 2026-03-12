import { getBookById, getLatestProgress, updateProgress } from "@/actions/book";
import { createNote, deleteNote, getNotes } from "@/actions/note";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import DeleteBookButton from "@/components/books/DeleteBookButton";
import ProgressTracker from "@/components/books/ProgressTracker";
import NoteForm from "@/components/notes/NoteForm";
import NoteList from "@/components/notes/NoteList";
import { revalidatePath } from "next/cache";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id, session.user.id);
  
  if (!book) notFound();

  const [latestProgress, notes] = await Promise.all([
    getLatestProgress(book.id),
    getNotes(book.id)
  ]);

  const handleUpdateProgress = async (pages: number) => {
    "use server";
    await updateProgress(book.id, pages, new Date().toISOString().split('T')[0]);
    revalidatePath(`/dashboard/books/${book.id}`);
  };

  const handleAddNote = async (content: string, highlight?: string, pageNumber?: number) => {
    "use server";
    await createNote({ bookId: book.id, content, highlight, pageNumber });
    revalidatePath(`/dashboard/books/${book.id}`);
  };

  const handleDeleteNote = async (noteId: string) => {
    "use server";
    await deleteNote(noteId);
    revalidatePath(`/dashboard/books/${book.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8 text-black">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
            <p className="text-lg text-gray-600">{book.author || "저자 미상"} | {book.publisher || "출판사 미상"}</p>
          </div>
          <div className="flex gap-2">
             <Link href={`/dashboard/books/${book.id}/edit`} className="px-4 py-2 border rounded hover:bg-gray-50 text-black transition">수정</Link>
             <DeleteBookButton bookId={book.id} userId={session.user.id} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div><span className="font-semibold">상태:</span> {book.status}</div>
          <div><span className="font-semibold">총 페이지:</span> {book.totalPages} 쪽</div>
        </div>
      </div>

      <ProgressTracker 
        bookId={book.id} 
        currentPages={latestProgress?.readPages || 0} 
        totalPages={book.totalPages}
        onUpdate={handleUpdateProgress}
      />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-black">독서 노트</h2>
        <NoteForm bookId={book.id} onSubmit={handleAddNote} />
        <NoteList notes={notes as any} onDeleteNote={handleDeleteNote} />
      </div>
    </div>
  );
}