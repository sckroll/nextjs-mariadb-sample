import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session) {
      redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold"><Link href="/dashboard">ReadLog</Link></h1>
        <nav className="flex gap-4 items-center">
          <Link href="/dashboard" className="text-gray-600 hover:text-black font-medium">내 서재</Link>
          <Link href="/dashboard/statistics" className="text-gray-600 hover:text-black font-medium">통계</Link>
          <Link href="/dashboard/calendar" className="text-gray-600 hover:text-black font-medium">캘린더</Link>
          <div className="flex items-center gap-2 ml-4 pl-4 border-l">
            {session.user.image && (
              <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border" />
            )}
            <div className="text-sm">
              <div className="font-semibold text-black">{session.user.name || "사용자"}</div>
              <Link href="/dashboard/account" className="text-xs text-blue-500 hover:underline">계정 관리</Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}