"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email.split('@')[0],
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
        <h2 className="text-2xl font-bold text-center">회원가입</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="email" placeholder="이메일" className="border p-2 rounded text-black" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="비밀번호" className="border p-2 rounded text-black" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">가입하기</button>
      </form>
    </div>
  );
}