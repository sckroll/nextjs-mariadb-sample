import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDailyReadingLogs } from "@/actions/statistics";
import ReadingCalendar from "@/components/calendar/ReadingCalendar";
import Link from "next/link";

/**
 * 월별 독서 활동 캘린더 페이지 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Promise<{ year?: string, month?: string }>} props.searchParams - URL 쿼리 파라미터
 * @returns {Promise<JSX.Element>} 캘린더 페이지 UI
 */
export default async function CalendarPage({ 
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

  const logs = await getDailyReadingLogs(session.user.id, year, month);

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-black">독서 캘린더</h2>
        <div className="flex items-center gap-4 bg-white border rounded-lg px-4 py-2 shadow-sm">
          <Link 
            href={`/dashboard/calendar?year=${prevYear}&month=${prevMonth}`}
            className="text-gray-400 hover:text-black transition"
          >
            &lt;
          </Link>
          <span className="font-bold text-black min-w-[100px] text-center">
            {year}년 {month}월
          </span>
          <Link 
            href={`/dashboard/calendar?year=${nextYear}&month=${nextMonth}`}
            className="text-gray-400 hover:text-black transition"
          >
            &gt;
          </Link>
        </div>
      </div>

      <ReadingCalendar year={year} month={month} logs={logs as any} />
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
        팁: 날짜 박스의 색상이 진할수록 해당 날짜에 더 많은 페이지를 읽었음을 의미합니다.
      </div>
    </div>
  );
}