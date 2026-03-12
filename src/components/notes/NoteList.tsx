"use client";

import { type notes } from "@/db/schema";
import NoteItem from "./NoteItem";

type Note = typeof notes.$inferSelect;

interface Props {
  notes: Note[];
  onDeleteNote: (id: string) => Promise<void>;
}

export default function NoteList({ notes, onDeleteNote }: Props) {
  if (notes.length === 0) {
    return (
      <div className="bg-gray-50 border border-dashed rounded-lg p-8 text-center text-gray-400">
        아직 작성된 독서 노트가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
}