"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const IMAGES = {
  loginBg: "https://www.figma.com/api/mcp/asset/421ec3cc-97cd-4232-b1b2-7c12e57c4496",
  iconBook: "https://www.figma.com/api/mcp/asset/7e5e6c68-1d6e-41ea-bc99-7d0a12895de9",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsPending(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    setIsPending(false);
    if (error) {
      setError(error.message || "로그인에 실패했습니다.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col md:items-center md:justify-center font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Link href="/" className="w-12 h-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-bold text-lg text-slate-900 tracking-tight">로그인</h1>
        <div className="w-12 h-12"></div> {/* Spacer */}
      </div>

      {/* Mobile Hero (hidden on desktop) */}
      <div className="md:hidden flex flex-col items-center pt-8 pb-6 px-4">
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/20">
          <div className="text-white font-bold text-3xl">R</div>
        </div>
        <h2 className="font-bold text-3xl text-slate-900 mb-2">ReadLog</h2>
        <p className="text-slate-500">독서 기록의 시작, 리드로그</p>
      </div>

      {/* Desktop Header Container (hidden on mobile) */}
      <div className="hidden md:flex w-full max-w-[1000px] justify-between items-center mb-8 px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">R</div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">ReadLog</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">계정이 없으신가요?</span>
          <Link href="/register" className="px-6 py-2.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition">
            회원가입
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:flex-none w-full md:max-w-[1000px] bg-white md:rounded-2xl md:shadow-xl md:border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel (Desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-slate-50 relative p-12 flex-col items-center justify-center text-center">
          <div className="absolute inset-0 opacity-10 mix-blend-multiply">
            <img src={IMAGES.loginBg} alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <img src={IMAGES.iconBook} alt="Book Icon" className="w-16 mb-8 opacity-80" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">당신의 독서 생활,<br/>체계적으로.</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-sm">
              진행 상황을 추적하고, 좋아하는 문장을 저장하고, 새로운 책을 발견하세요.
            </p>
          </div>
        </div>

        {/* Right Panel (Login Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
          <div className="hidden md:block mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">다시 만나서 반가워요</h2>
            <p className="text-slate-500">로그인하여 독서 여정을 계속하세요</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">이메일</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <input 
                  type="email" 
                  placeholder="example@readlog.com" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-900">비밀번호</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">비밀번호를 잊으셨나요?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
                <input 
                  type="password" 
                  placeholder="비밀번호를 입력하세요" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
              <label htmlFor="remember" className="text-sm text-slate-600">30일 동안 로그인 유지</label>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-4 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </button>
            
            {/* Mobile Footer Link (visible only on mobile) */}
            <div className="md:hidden mt-8 text-center text-sm text-slate-500">
              아직 계정이 없으신가요? <Link href="/register" className="text-blue-600 font-medium">회원가입</Link>
            </div>

          </form>
        </div>
      </div>
      
      {/* Desktop Footer Container (hidden on mobile) */}
      <div className="hidden md:flex w-full max-w-[1000px] justify-between items-center mt-8 px-8 text-sm text-slate-500">
        <p>© 2024 ReadLog Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 transition">개인정보 처리방침</a>
          <a href="#" className="hover:text-slate-900 transition">서비스 약관</a>
          <a href="#" className="hover:text-slate-900 transition">고객 센터</a>
        </div>
      </div>
    </div>
  );
}