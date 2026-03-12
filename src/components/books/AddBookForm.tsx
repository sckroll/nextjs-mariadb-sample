"use client";

import BookForm from "./BookForm";

interface Props {
  onSubmitAction: (data: FormData) => void;
}

export default function AddBookForm({ onSubmitAction }: Props) {
  return (
    <BookForm onSubmitAction={onSubmitAction} buttonLabel="등록하기" />
  );
}