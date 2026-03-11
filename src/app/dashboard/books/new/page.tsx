import AddBookForm from "@/components/books/AddBookForm";
import { createBook } from "@/actions/book";
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

  const handleAddBook = async (formData: FormData) => {
    "use server";
    
    // Parse FormData into object
    const rawData = {
      title: formData.get("title") as string,
      author: formData.get("author") as string || undefined,
      publisher: formData.get("publisher") as string || undefined,
      totalPages: Number(formData.get("totalPages")),
      status: "WISH" as const, // default status for now
    };

    await createBook(session.user.id, rawData);
    
    // Redirect to dashboard after successful creation
    redirect("/dashboard");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">새 책 등록</h2>
      <AddBookForm onSubmitAction={handleAddBook} />
    </div>
  );
}