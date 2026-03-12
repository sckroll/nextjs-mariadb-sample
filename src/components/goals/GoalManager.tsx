"use client";

import { useState } from "react";

interface Props {
  onCreate: (data: any) => Promise<void>;
}

/**
 * 새로운 독서 목표를 설정하는 폼 컴포넌트입니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 목표 설정 UI
 */
export default function GoalManager({ onCreate }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setIsPending(true);
    try {
      await onCreate({
        periodType: formData.get("periodType"),
        targetType: formData.get("targetType"),
        targetValue: Number(formData.get("targetValue")),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
      });
      setIsOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition font-medium"
      >
        + 새로운 목표 설정하기
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border shadow-md">
      <h3 className="text-lg font-bold mb-4 text-black">새로운 목표 설정</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간</label>
            <select name="periodType" className="w-full border p-2 rounded-md bg-white text-black">
              <option value="MONTHLY">월간</option>
              <option value="YEARLY">연간</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기준</label>
            <select name="targetType" className="w-full border p-2 rounded-md bg-white text-black">
              <option value="BOOKS">도서 수 (권)</option>
              <option value="PAGES">페이지 수 (쪽)</option>
              <option value="DAYS">독서 일수 (일)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">목표 수치</label>
          <input name="targetValue" type="number" required min="1" className="w-full border p-2 rounded-md text-black" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
            <input name="startDate" type="date" required className="w-full border p-2 rounded-md text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
            <input name="endDate" type="date" required className="w-full border p-2 rounded-md text-black" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2 border rounded-md hover:bg-gray-50 text-black transition"
          >
            취소
          </button>
          <button 
            type="submit" 
            disabled={isPending}
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? "저장 중..." : "목표 저장"}
          </button>
        </div>
      </form>
    </div>
  );
}