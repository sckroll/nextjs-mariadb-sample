import AddBookForm from "@/components/books/AddBookForm";
import BookForm from "@/components/books/BookForm";
import { createBook } from "@/actions/book";
import { assignTagsToBook, getTags } from "@/actions/tag";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewBookPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const tags = await getTags(session.user.id);

  const handleAddBook = async (formData: FormData) => {
    "use server";
    
    const tagIds = formData.getAll("tagIds") as string[];

    const rawData = {
      title: formData.get("title") as string,
      author: formData.get("author") as string || undefined,
      publisher: formData.get("publisher") as string || undefined,
      totalPages: Number(formData.get("totalPages")),
      status: formData.get("status") as "WISH" | "READING" | "COMPLETED",
    };

    const result = await createBook(session.user.id, rawData);
    
    if (result.success && tagIds.length > 0) {
      await assignTagsToBook(result.id, tagIds);
    }
    
    redirect("/dashboard");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black">새 책 등록</h2>
      <BookForm availableTags={tags as any} onSubmitAction={handleAddBook} buttonLabel="등록하기" />
    </div>
  );
}