import AddBookForm from "@/components/books/AddBookForm";
// import { createBook } from "@/actions/book"; // Will be integrated later

export default function NewBookPage() {
  const handleAddBook = async (formData: FormData) => {
    "use server";
    // Wrapper for server action
    // In a real scenario we need the userId from session
    console.log("Submit", formData.get("title"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">새 책 등록</h2>
      <AddBookForm onSubmitAction={handleAddBook} />
    </div>
  );
}