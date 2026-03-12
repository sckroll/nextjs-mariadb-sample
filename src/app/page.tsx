import Link from "next/link";
import Image from "next/image";

const IMAGES = {
  hero: "https://www.figma.com/api/mcp/asset/88fd1721-96e6-4b61-8b67-9ab678a3c306",
  feature1: "https://www.figma.com/api/mcp/asset/5b0b1055-ff37-4605-ad70-3837141566cb",
  feature2: "https://www.figma.com/api/mcp/asset/e2e02526-2d44-4b91-9ca0-dc6bde1843f8",
  feature3: "https://www.figma.com/api/mcp/asset/d3d50f48-ab8f-42f5-aa91-55376e45a0e7",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <span className="font-bold text-xl tracking-tight">ReadLog</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-600 hover:text-black">기능</a>
          <a href="#testimonials" className="text-sm text-gray-600 hover:text-black">후기</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-black">가격</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-black hidden sm:block">로그인</Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            무료로 시작
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              당신의 독서 여정,<br className="hidden md:block" />
              <span className="text-blue-600">아름다운 기록으로.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              ReadLog는 개인 서재를 정리하고, 실시간으로 독서 진행 상황을 추적하며, 독서 습관에 대한 깊은 인사이트를 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-600/20 text-center">
                무료로 시작하기
              </Link>
              <a href="#features" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-center">
                더 알아보기
              </a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
              </div>
              <span className="text-sm text-gray-500">전 세계 10,000명 이상의 독자와 함께하세요</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Using a placeholder if Figma URL expires, but trying Figma URL first */}
              <img src={IMAGES.hero} alt="Reading nook" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">책 관리에 필요한 모든 것.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">기록 그 이상의 가치를 경험하세요.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <img src={IMAGES.feature1} alt="" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">개인 서재 관리</h3>
              <p className="text-gray-600 leading-relaxed">
                태그, 평점, 맞춤형 컬렉션으로 실물 도서와 디지털 컬렉션을 정리하세요. 바코드 스캔 한 번으로 책 제목부터 저자 정보까지 한 번에 불러오세요.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <img src={IMAGES.feature2} alt="" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">독서 진행 추적</h3>
              <p className="text-gray-600 leading-relaxed">
                모든 페이지를 추적하고, 목표를 설정하며, 일일 독서 세션을 기록하세요. 잊고 싶지 않은 문장이나 그날의 감상을 사진과 함께 기록하세요.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <img src={IMAGES.feature3} alt="" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">통찰력 있는 통계</h3>
              <p className="text-gray-600 leading-relaxed">
                나의 독서 패턴을 발견하세요. 장르별 분석부터 월간 속도까지 확인 가능합니다. 월별 독서량과 선호 장르를 통계 데이터로 확인하며 습관을 만드세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">애독자들이 사랑하는 서비스</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-600 mb-6 min-h-[80px]">
              "UI가 정말 깔끔해서 계속 쓰고 싶게 만들어요. 책 읽고 나서 기록하는 시간이 기다려집니다. 통계 섹션이 동기부여가 많이 됩니다."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-bold text-gray-900">김서현</div>
                <div className="text-sm text-gray-500">한 달에 5권 읽는 독서가</div>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-600 mb-6 min-h-[80px]">
              "바코드 검색 기능이 너무 편해요. 수동으로 입력 안 해도 되니까 서재 정리하기 딱 좋습니다. 깔끔하고 전문적입니다."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-bold text-gray-900">이준호</div>
                <div className="text-sm text-gray-500">자기계발 매니아</div>
              </div>
            </div>
          </div>
          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-600 mb-6 min-h-[80px]">
              "The reading progress bars are so satisfying to update. It makes every reading session feel like an achievement."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-bold text-gray-900">박지민</div>
                <div className="text-sm text-gray-500">Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.figma.com/api/mcp/asset/pattern')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">기록을 시작할 준비가 되셨나요?</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              자신의 서재를 마스터하고 독서 추적의 즐거움을 되찾은 수천 명의 독자와 함께하세요. 무료 가입으로 당신의 첫 번째 책을 기록해 보세요.
            </p>
            <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition shadow-lg text-lg">
              무료 체험 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs">R</div>
              <span className="font-bold text-xl">ReadLog</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              전 세계 독자들을 위한 최고의 동반자를 만듭니다. 당신의 모든 기록이 성장이 되는 곳.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">제품</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">기능</a></li>
              <li><a href="#" className="hover:text-white transition">로드맵</a></li>
              <li><a href="#" className="hover:text-white transition">가격</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">지원</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">고객 센터</a></li>
              <li><a href="#" className="hover:text-white transition">문의하기</a></li>
              <li><a href="#" className="hover:text-white transition">개인정보 처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2024 ReadLog Inc. All rights reserved. Designed for readers by readers.</p>
        </div>
      </footer>
    </div>
  );
}