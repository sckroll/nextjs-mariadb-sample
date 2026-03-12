"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { type tags } from "@/db/schema";

type Tag = typeof tags.$inferSelect;

interface Props {
  tags?: Tag[];
}

/**
 * 대시보드 도서 목록을 검색하고 필터링하는 UI 컴포넌트입니다.
 * 제목 검색, 상태 필터링, 태그 필터링을 지원합니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 검색 및 필터 UI
 */
export default function SearchFilter({ tags = [] }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [tagId, setTagId] = useState(searchParams.get("tagId") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) params.set("search", search);
    else params.delete("search");
    
    if (status) params.set("status", status);
    else params.delete("status");

    if (tagId) params.set("tagId", tagId);
    else params.delete("tagId");

    startTransition(() => {
      router.push(`/dashboard?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="filter-search" className="block text-xs font-medium text-gray-500 mb-1">제목 검색</label>
        <input 
          id="filter-search"
          type="text" 
          placeholder="제목으로 검색..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="w-[150px]">
        <label htmlFor="filter-status" className="block text-xs font-medium text-gray-500 mb-1">상태</label>
        <select 
          id="filter-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">모든 상태</option>
          <option value="WISH">읽고 싶음</option>
          <option value="READING">읽는 중</option>
          <option value="COMPLETED">완독</option>
        </select>
      </div>
      <div className="w-[150px]">
        <label htmlFor="filter-tag" className="block text-xs font-medium text-gray-500 mb-1">태그</label>
        <select 
          id="filter-tag"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">모든 태그</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50 h-[38px] mt-5 font-medium"
      >
        {isPending ? "검색 중..." : "검색"}
      </button>
    </form>
  );
}