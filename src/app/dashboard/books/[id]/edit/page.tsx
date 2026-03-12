import BookForm from "@/components/books/BookForm";
import { getBookById, updateBook } from "@/actions/book";
import { assignTagsToBook, getBookTags, getTags } from "@/actions/tag";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedParams = await params;
  
  const [book, allTags, bookTags] = await Promise.all([
    getBookById(resolvedParams.id, session.user.id),
    getTags(session.user.id),
    getBookTags(resolvedParams.id)
  ]);
  
  if (!book) notFound();

  const initialTagIds = bookTags.map(t => t.id);

  const handleUpdateBook = async (formData: FormData) => {
    "use server";
    
    const tagIds = formData.getAll("tagIds") as string[];

    const rawData = {
      title: formData.get("title") as string,
      author: formData.get("author") as string || undefined,
      publisher: formData.get("publisher") as string || undefined,
      totalPages: Number(formData.get("totalPages")),
      status: formData.get("status") as "WISH" | "READING" | "COMPLETED",
    };

    await updateBook(session.user.id, resolvedParams.id, rawData);
    await assignTagsToBook(resolvedParams.id, tagIds);
    
    redirect(`/dashboard/books/${resolvedParams.id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">책 정보 수정</h2>
      <BookForm 
        initialData={book} 
        availableTags={allTags as any} 
        initialTagIds={initialTagIds}
        onSubmitAction={handleUpdateBook} 
        buttonLabel="수정 완료" 
      />
    </div>
  );
}