interface Props {
  label: string;
  current: number;
  target: number;
  unit: string;
}

/**
 * 목표 달성률을 시각적으로 표시하는 컴포넌트입니다.
 * @param {Props} props - 컴포넌트 속성
 * @returns {JSX.Element} 목표 진행률 UI
 */
export default function GoalProgress({ label, current, target, unit }: Props) {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-700">{label}</span>
        <span className="text-sm font-medium text-blue-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
        <div 
          className="bg-blue-500 h-3 rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>현재: {current}{unit}</span>
        <span>목표: {target}{unit}</span>
      </div>
    </div>
  );
}