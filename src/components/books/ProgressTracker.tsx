"use client";

import { useState } from "react";

interface Props {
  bookId: string;
  currentPages: number;
  totalPages: number;
  onUpdate: (pages: number) => Promise<void>;
}

export default function ProgressTracker({ bookId, currentPages, totalPages, onUpdate }: Props) {
  const [isEditing, setIsPending] = useState(false);
  const [pages, setPages] = useState(currentPages);
  
  const percentage = Math.round((currentPages / totalPages) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await onUpdate(pages);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">독서 진행률</h3>
        <span className="text-sm font-medium text-gray-500">{currentPages} / {totalPages} 쪽 ({percentage}%)</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="progress-pages" className="block text-sm font-medium text-gray-700 mb-1">오늘 읽은 페이지</label>
          <input 
            id="progress-pages"
            type="number" 
            min="0" 
            max={totalPages}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button 
          type="submit" 
          disabled={isEditing || pages === currentPages}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isEditing ? "저장 중..." : "업데이트"}
        </button>
      </form>
    </div>
  );
}