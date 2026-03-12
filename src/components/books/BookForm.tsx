"use client";

import { useState } from "react";
import { type books, type tags } from "@/db/schema";

type Book = typeof books.$inferSelect;
type Tag = typeof tags.$inferSelect;

interface Props {
  initialData?: Partial<Book>;
  availableTags?: Tag[];
  initialTagIds?: string[];
  onSubmitAction: (data: FormData) => void;
  buttonLabel?: string;
}

/**
 * 도서 정보를 입력하거나 수정하는 폼 컴포넌트입니다. 태그 선택 기능을 포함합니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 도서 폼 UI
 */
export default function BookForm({ initialData, availableTags = [], initialTagIds = [], onSubmitAction, buttonLabel = "저장하기" }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTagIds);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // 선택된 태그 ID들을 FormData에 추가
    selectedTags.forEach(id => formData.append("tagIds", id));

    const newStatus = formData.get("status");
    const currentStatus = initialData?.status;

    if (currentStatus && currentStatus !== "WISH" && newStatus === "WISH") {
      const confirmed = window.confirm(
        "상태를 '읽고 싶음'으로 변경하면 기존의 모든 독서 진행 기록이 초기화됩니다. 계속하시겠습니까?"
      );
      if (!confirmed) return;
    }

    onSubmitAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md bg-white p-6 rounded-lg border shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 text-black">제목 *</label>
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
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1 text-black">저자</label>
        <input 
          id="author" 
          name="author" 
          type="text" 
          defaultValue={initialData?.author || ""}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1 text-black">출판사</label>
        <input 
          id="publisher" 
          name="publisher" 
          type="text" 
          defaultValue={initialData?.publisher || ""}
          className="border p-2 w-full text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>
      <div>
        <label htmlFor="totalPages" className="block text-sm font-medium text-gray-700 mb-1 text-black">총 페이지 수 *</label>
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
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 text-black">상태</label>
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

      {availableTags.length > 0 && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-black">태그 선택</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <label 
                  key={tag.id}
                  className={`
                    flex items-center px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all
                    ${isSelected ? 'shadow-sm' : 'bg-opacity-10 hover:bg-opacity-20'}
                  `}
                  style={{ 
                    backgroundColor: isSelected ? tag.color : tag.color + "10",
                    borderColor: tag.color + (isSelected ? "" : "40"),
                    color: isSelected ? "white" : tag.color
                  }}
                >
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag.id) 
                          ? prev.filter(id => id !== tag.id) 
                          : [...prev, tag.id]
                      );
                    }}
                  />
                  {tag.name}
                </label>
              );
            })}
          </div>
        </div>
      )}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition font-medium mt-4">
        {buttonLabel}
      </button>
    </form>
  );
}