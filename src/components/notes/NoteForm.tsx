"use client";

import { useState } from "react";

interface Props {
  bookId: string;
  onSubmit: (content: string, highlight?: string, pageNumber?: number) => Promise<void>;
}

export default function NoteForm({ bookId, onSubmit }: Props) {
  const [content, setContent] = useState("");
  const [highlight, setHighlight] = useState("");
  const [pageNumber, setPageNumber] = useState<number | "">("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPending(true);
    try {
      await onSubmit(content, highlight || undefined, pageNumber === "" ? undefined : pageNumber);
      setContent("");
      setHighlight("");
      setPageNumber("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border shadow-sm mb-8">
      <h3 className="text-lg font-bold mb-4 text-black">새 독서 노트</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1">내용 *</label>
          <textarea 
            id="note-content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded-md text-black h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="노트 내용을 입력하세요..."
          />
        </div>
        <div>
          <label htmlFor="note-highlight" className="block text-sm font-medium text-gray-700 mb-1">인상 깊은 문장</label>
          <input 
            id="note-highlight"
            type="text"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="책에서 인상 깊었던 구절을 적어보세요"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="note-page" className="block text-sm font-medium text-gray-700 mb-1">페이지 번호</label>
          <input 
            id="note-page"
            type="number"
            min="1"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button 
          type="submit" 
          disabled={isPending || !content.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 font-medium"
        >
          {isPending ? "저장 중..." : "노트 저장"}
        </button>
      </div>
    </form>
  );
}