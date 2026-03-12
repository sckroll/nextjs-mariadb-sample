import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountForm from "./AccountForm";

/**
 * 계정 관리 페이지입니다.
 * @returns {Promise<JSX.Element>} 계정 관리 페이지 UI
 */
export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-black">계정 관리</h2>
      <AccountForm user={session.user as any} />
    </div>
  );
}