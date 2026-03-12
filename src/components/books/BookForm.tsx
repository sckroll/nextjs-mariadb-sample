"use client";

import { type books } from "@/db/schema";

type Book = typeof books.$inferSelect;

interface Props {
  initialData?: Partial<Book>;
  onSubmitAction: (data: FormData) => void;
  buttonLabel?: string;
}

export default function BookForm({ initialData, onSubmitAction, buttonLabel = "저장하기" }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmitAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md bg-white p-6 rounded-lg border shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
        <input 
          id="title" 
          name="title" 
          type="text" 
          required 
          defaultValue={initialData?.title}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">저자</label>
        <input 
          id="author" 
          name="author" 
          type="text" 
          defaultValue={initialData?.author || ""}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">출판사</label>
        <input 
          id="publisher" 
          name="publisher" 
          type="text" 
          defaultValue={initialData?.publisher || ""}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="totalPages" className="block text-sm font-medium text-gray-700 mb-1">총 페이지 수 *</label>
        <input 
          id="totalPages" 
          name="totalPages" 
          type="number" 
          min="1" 
          required 
          defaultValue={initialData?.totalPages}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">상태</label>
        <select 
          id="status" 
          name="status" 
          defaultValue={initialData?.status || "WISH"}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="WISH">읽고 싶음</option>
          <option value="READING">읽는 중</option>
          <option value="COMPLETED">완독</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition font-medium mt-2">
        {buttonLabel}
      </button>
    </form>
  );
}