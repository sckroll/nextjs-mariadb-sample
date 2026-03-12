"use client";

import { type notes } from "@/db/schema";
import { useState } from "react";

type Note = typeof notes.$inferSelect;

interface Props {
  note: Note;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteItem({ note, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("이 노트를 삭제하시겠습니까?")) {
      setIsDeleting(true);
      try {
        await onDelete(note.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mb-4">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {note.pageNumber ? `p.${note.pageNumber}` : "기록"}
        </span>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs text-red-500 hover:underline disabled:opacity-50"
        >
          {isDeleting ? "삭제 중..." : "삭제"}
        </button>
      </div>
      
      {note.highlight && (
        <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600 mb-4">
          "{note.highlight}"
        </blockquote>
      )}
      
      <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
      
      <div className="mt-4 text-xs text-gray-400">
        {new Date(note.createdAt!).toLocaleDateString()}
      </div>
    </div>
  );
}