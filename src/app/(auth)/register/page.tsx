"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera } from "lucide-react"; // Using lucide-react for the camera icon

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsPending(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: name.trim() || email.split('@')[0],
      image: image.trim() || undefined,
    });
    setIsPending(false);

    if (error) {
      setError(error.message || "회원가입에 실패했습니다.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col md:items-center md:justify-center font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <Link href="/login" className="w-12 h-12 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <h1 className="font-bold text-lg text-slate-900 tracking-tight">회원가입</h1>
        <div className="w-12 h-12"></div> {/* Spacer */}
      </div>

      {/* Desktop Header Container (hidden on mobile) */}
      <div className="hidden md:flex w-full max-w-[1100px] justify-between items-center mb-8 px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">R</div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">ReadLog</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">이미 계정이 있으신가요?</span>
          <Link href="/login" className="px-6 py-2.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition">
            로그인
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:flex-none w-full md:max-w-[1100px] bg-white md:rounded-2xl md:shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel (Registration Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-white">
          <div className="hidden md:block mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">ReadLog 가입하기</h2>
            <p className="text-slate-500 text-lg">독서 활동을 기록하고 독서가 커뮤니티에 참여하세요.</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-6 w-full max-w-[400px] mx-auto md:mx-0">
            {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}

            {/* Profile Picture Upload UI */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative overflow-hidden group">
                {image ? (
                  <img src={image} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-slate-400" />
                )}
                <div className="absolute inset-0 bg-black/20 hidden group-hover:flex items-center justify-center transition-all cursor-pointer">
                  <span className="text-white text-xs font-bold">수정</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">프로필 사진 URL</p>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  className="mt-1 text-xs text-center border-b border-slate-200 outline-none w-full text-slate-500 focus:border-blue-500" 
                  value={image} 
                  onChange={e => setImage(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">이름</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="이름을 입력하세요" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">이메일 주소</label>
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

            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-slate-900">비밀번호</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                  <input 
                    type="password" 
                    placeholder="8자 이상" 
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    minLength={8}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-slate-900">비밀번호 확인</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                  <input 
                    type="password" 
                    placeholder="다시 입력" 
                    className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
              <label htmlFor="terms" className="text-sm text-slate-500 leading-snug">
                가입 시 리드로그의 <a href="#" className="text-blue-600 font-medium hover:underline">이용약관</a> 및 <a href="#" className="text-blue-600 font-medium hover:underline">개인정보 처리방침</a>에 동의하게 됩니다.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-4 mt-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isPending ? "계정 생성 중..." : "계정 생성하기"}
            </button>
            
            {/* Mobile Footer Link (visible only on mobile) */}
            <div className="md:hidden mt-4 text-center text-sm text-slate-500">
              이미 계정이 있으신가요? <Link href="/login" className="text-blue-600 font-medium">로그인하기</Link>
            </div>

          </form>
        </div>

        {/* Right Panel Visual Section (Desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 relative p-12 flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-800 opacity-90 z-0"></div>
          
          {/* Abstract circles */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full border-[40px] border-white/10 z-0"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-8 opacity-90"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <h2 className="text-3xl font-bold mb-6 leading-tight max-w-sm">
              "독서는 죽기 전에 천 번의 삶을 살게 한다."
            </h2>
            <p className="text-lg text-white/80 mb-12">— 조지 R.R. 마틴</p>

            <div className="flex gap-4 w-full max-w-md">
              <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-left">
                <div className="font-bold mb-1">독서 기록</div>
                <div className="text-xs text-white/70">읽는 모든 책에 대해 상세한 기록을 남기세요.</div>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-left">
                <div className="font-bold mb-1">커뮤니티</div>
                <div className="text-xs text-white/70">리뷰를 공유하고 다음으로 좋아할 작가를 찾아보세요.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Desktop Footer Container (hidden on mobile) */}
      <div className="hidden md:flex w-full max-w-[1100px] justify-between items-center mt-8 px-8 text-sm text-slate-500">
        <p>© 2024 ReadLog Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 transition">도움말</a>
          <a href="#" className="hover:text-slate-900 transition">개인정보</a>
          <a href="#" className="hover:text-slate-900 transition">약관</a>
          <a href="#" className="hover:text-slate-900 transition">보안</a>
        </div>
      </div>
    </div>
  );
}