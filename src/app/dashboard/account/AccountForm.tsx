"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

/**
 * 계정 관리 폼 컴포넌트입니다. (클라이언트 사이드 로직)
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 계정 폼 UI
 */
export default function AccountForm({ user }: Props) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);

    const { error: updateError } = await authClient.updateUser({
      name,
      image: image || undefined,
    });

    setIsPending(false);

    if (updateError) {
      setError(updateError.message || "프로필 업데이트에 실패했습니다.");
    } else {
      setMessage("프로필이 성공적으로 업데이트되었습니다.");
      router.refresh();
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsPending(true);

    const { error: pwdError } = await authClient.changePassword({
      newPassword,
      currentPassword,
      revokeOtherSessions: true,
    });

    setIsPending(false);

    if (pwdError) {
      setError(pwdError.message || "비밀번호 변경에 실패했습니다.");
    } else {
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      {message && <p className="bg-green-50 text-green-700 p-3 rounded-md border border-green-200">{message}</p>}
      {error && <p className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-bold mb-4 text-black">프로필 설정</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일 (변경 불가)</label>
            <input type="email" value={user.email} disabled className="w-full border p-2 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">프로필 이미지 URL</label>
            <input type="url" value={image} onChange={e => setImage(e.target.value)} className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium">
            프로필 업데이트
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-bold mb-4 text-black">비밀번호 변경</h3>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full border p-2 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" disabled={isPending} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50 font-medium">
            비밀번호 변경
          </button>
        </form>
      </div>

      <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-100">
        <h3 className="text-lg font-bold mb-2 text-red-800">로그아웃</h3>
        <p className="text-sm text-red-600 mb-4">현재 기기에서 로그아웃합니다.</p>
        <button onClick={handleLogout} disabled={isPending} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 font-medium">
          로그아웃
        </button>
      </div>
    </div>
  );
}