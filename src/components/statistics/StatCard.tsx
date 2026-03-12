interface Props {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

/**
 * 통계 수치를 강조하여 표시하는 카드 컴포넌트입니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 통계 카드 UI
 */
export default function StatCard({ label, value, unit, icon }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center text-center">
      {icon && <div className="mb-2 text-blue-500">{icon}</div>}
      <span className="text-sm font-medium text-gray-500 mb-1">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-black">{value}</span>
        {unit && <span className="text-gray-400 text-sm">{unit}</span>}
      </div>
    </div>
  );
}