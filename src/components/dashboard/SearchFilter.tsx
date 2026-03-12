"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");
    
    if (status) params.set("status", status);
    else params.delete("status");

    startTransition(() => {
      router.push(`/dashboard?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex-1 min-w-[200px]">
        <input 
          type="text" 
          placeholder="제목으로 검색..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="w-[150px]">
        <select 
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
      <button 
        type="submit" 
        disabled={isPending}
        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition disabled:opacity-50"
      >
        {isPending ? "검색 중..." : "검색"}
      </button>
    </form>
  );
}