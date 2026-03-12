"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: name.trim() || email.split('@')[0],
      image: image.trim() || undefined,
    });
    if (error) {
      setError(error.message || "회원가입에 실패했습니다.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-black">회원가입</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
          <input type="email" placeholder="이메일" className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 *</label>
          <input type="password" placeholder="비밀번호" className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input type="text" placeholder="이름 (선택)" className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">프로필 이미지 URL</label>
          <input type="url" placeholder="https://... (선택)" className="w-full border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none" value={image} onChange={e => setImage(e.target.value)} />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium mt-2">가입하기</button>
      </form>
    </div>
  );
}