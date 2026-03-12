"use client";

import { useState } from "react";
import { type tags } from "@/db/schema";

type Tag = typeof tags.$inferSelect;

interface Props {
  tags: Tag[];
  onCreate: (name: string, color: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

/**
 * 태그를 관리하는 UI 컴포넌트입니다. 태그 목록 표시 및 추가/삭제 기능을 제공합니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 태그 관리 UI
 */
export default function TagManager({ tags, onCreate, onDelete }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6"); // 기본 블루 색상
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsPending(true);
    try {
      await onCreate(name, color);
      setName("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
      <h3 className="text-lg font-bold mb-4 text-black">태그 관리</h3>
      
      {/* 태그 추가 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="tag-name" className="block text-xs font-medium text-gray-500 mb-1">태그 이름</label>
          <input 
            id="tag-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="태그 이름 입력..."
          />
        </div>
        <div>
          <label htmlFor="tag-color" className="block text-xs font-medium text-gray-500 mb-1">색상</label>
          <input 
            id="tag-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-[38px] w-12 border rounded-md p-1 cursor-pointer bg-white"
          />
        </div>
        <button 
          type="submit" 
          disabled={isPending || !name.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-sm font-medium"
        >
          {isPending ? "저장 중..." : "추가"}
        </button>
      </form>

      {/* 태그 목록 */}
      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 태그가 없습니다.</p>
        ) : (
          tags.map(tag => (
            <div 
              key={tag.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium shadow-sm transition-all hover:bg-gray-50"
              style={{ borderColor: tag.color + "40", backgroundColor: tag.color + "10", color: tag.color }}
            >
              <span>{tag.name}</span>
              <button 
                onClick={() => onDelete(tag.id)}
                className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
                title="삭제"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}