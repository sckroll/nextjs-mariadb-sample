"use client";

interface Props {
  onSubmitAction: (data: FormData) => void;
}

export default function AddBookForm({ onSubmitAction }: Props) {
  return (
    <form action={onSubmitAction} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="title">제목 *</label>
        <input id="title" name="title" type="text" required className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="author">저자</label>
        <input id="author" name="author" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="publisher">출판사</label>
        <input id="publisher" name="publisher" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="totalPages">총 페이지 수 *</label>
        <input id="totalPages" name="totalPages" type="number" min="1" required className="border p-2 w-full text-black" />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">등록하기</button>
    </form>
  );
}