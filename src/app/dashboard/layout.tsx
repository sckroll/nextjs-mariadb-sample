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
          <Link href="/dashboard" className="text-gray-600 hover:text-black">내 서재</Link>
          <Link href="/dashboard/statistics" className="text-gray-600 hover:text-black">통계</Link>
          <div className="text-sm text-gray-500 ml-4">{session.user.email}</div>
        </nav>
      </header>
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}