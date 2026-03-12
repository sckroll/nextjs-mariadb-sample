import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getMonthlyStatistics } from "@/actions/statistics";
import StatCard from "@/components/statistics/StatCard";
import { BookCheck, FileText, Star } from "lucide-react";
import Link from "next/link";

/**
 * 월별 독서 통계를 표시하는 페이지 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Promise<{ year?: string, month?: string }>} props.searchParams - URL 쿼리 파라미터
 * @returns {Promise<JSX.Element>} 통계 페이지 UI
 */
export default async function StatisticsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ year?: string, month?: string }> 
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedSearchParams = await searchParams;
  const now = new Date();
  const year = Number(resolvedSearchParams.year) || now.getFullYear();
  const month = Number(resolvedSearchParams.month) || (now.getMonth() + 1);

  const stats = await getMonthlyStatistics(session.user.id, year, month);

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-black">독서 통계</h2>
        <div className="flex items-center gap-4 bg-white border rounded-lg px-4 py-2 shadow-sm">
          <Link 
            href={`/dashboard/statistics?year=${prevYear}&month=${prevMonth}`}
            className="text-gray-400 hover:text-black transition"
          >
            &lt;
          </Link>
          <span className="font-bold text-black min-w-[100px] text-center">
            {year}년 {month}월
          </span>
          <Link 
            href={`/dashboard/statistics?year=${nextYear}&month=${nextMonth}`}
            className="text-gray-400 hover:text-black transition"
          >
            &gt;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="완독한 책" 
          value={stats.booksCompleted} 
          unit="권" 
          icon={<BookCheck size={24} />} 
        />
        <StatCard 
          label="읽은 페이지" 
          value={stats.pagesRead.toLocaleString()} 
          unit="쪽" 
          icon={<FileText size={24} />} 
        />
        <StatCard 
          label="평균 평점" 
          value={stats.averageRating} 
          unit="점" 
          icon={<Star size={24} />} 
        />
      </div>

      {/* Placeholder for Goals and Calendar */}
      <div className="mt-12 p-8 border border-dashed rounded-xl text-center text-gray-400 bg-white/50">
        독서 목표와 캘린더 기능이 곧 추가됩니다!
      </div>
    </div>
  );
}