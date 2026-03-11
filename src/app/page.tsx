import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">ReadLog</h1>
      <p className="text-lg mb-8 text-gray-600">당신의 독서 여정을 기록하세요</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">로그인</Link>
        <Link href="/register" className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">회원가입</Link>
      </div>
    </main>
  );
}