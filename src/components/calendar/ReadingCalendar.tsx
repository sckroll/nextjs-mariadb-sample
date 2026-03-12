interface ReadingLog {
  date: Date;
  pages: number;
}

interface Props {
  year: number;
  month: number;
  logs: ReadingLog[];
}

/**
 * 월간 독서 활동을 달력 형태로 시각화하는 컴포넌트입니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 독서 캘린더 UI
 */
export default function ReadingCalendar({ year, month, logs }: Props) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getLogForDay = (day: number) => {
    return logs.find(log => {
      const logDate = new Date(log.date);
      return logDate.getDate() === day && 
             logDate.getMonth() + 1 === month && 
             logDate.getFullYear() === year;
    });
  };

  const getIntensityClass = (pages: number) => {
    if (pages === 0) return "bg-gray-50";
    if (pages < 20) return "bg-blue-100 text-blue-800";
    if (pages < 50) return "bg-blue-300 text-blue-900";
    if (pages < 100) return "bg-blue-500 text-white";
    return "bg-blue-700 text-white font-bold";
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {padding.map(i => (
          <div key={`pad-${i}`} className="h-14 rounded-lg bg-gray-50/50"></div>
        ))}

        {days.map(day => {
          const log = getLogForDay(day);
          const pages = log?.pages || 0;
          
          return (
            <div 
              key={day} 
              className={`h-14 rounded-lg border flex flex-col items-center justify-center relative group transition-all ${getIntensityClass(pages)}`}
            >
              <span className="text-xs absolute top-1 left-1.5 opacity-60">{day}</span>
              {pages > 0 && <span className="text-sm">{pages}p</span>}
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                {pages}페이지 독서
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end gap-4 mt-4">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <span>적음</span>
          <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-blue-700 rounded-sm"></div>
          <span>많음</span>
        </div>
      </div>
    </div>
  );
}