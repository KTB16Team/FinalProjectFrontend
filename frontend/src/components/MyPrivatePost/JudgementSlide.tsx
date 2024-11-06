import { PieChart, Pie, Cell } from 'recharts';
import {MyPrivatePostForm} from "@/types/myPrivatePostPreviewForm.ts";

interface JudgementSlideProps {
  myPrivatePost: MyPrivatePostForm;
}

export default function JudgementSlide({myPrivatePost}: JudgementSlideProps) {

  const data = [
    { name: 'A입장', value: myPrivatePost.faultRatePlaintiff },
    { name: 'B입장', value: myPrivatePost.faultRateDefendant },
  ];

  const COLORS = ['#9F7AEA', '#D6BCFA'];

  // 과실 비율이 높은 쪽 확인 -> 과실 비율 아래에 큰 쪽 입장이라고 써지도록!
  const higherPartyLabel = myPrivatePost.faultRatePlaintiff > myPrivatePost.faultRateDefendant ? 'A입장' : 'B입장';

  return (
    <div className="space-y-4">
      {/* Donut Chart Box */}
      <div className="bg-white rounded">
        <div className="flex flex-col items-center p-4">
          {/* Chart Container */}
          <div className="relative w-64 h-64 mb-4">
            <PieChart width={256} height={256}>
              <Pie
                data={data}
                cx={128}
                cy={128}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="ml-4 text-2xl font-bold text-gray-900">
                {Math.max(myPrivatePost.faultRatePlaintiff, myPrivatePost.faultRateDefendant).toFixed(1)}%
              </div>
              <div className="ml-1 text-m text-gray-500">
                {higherPartyLabel}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#9F7AEA] mr-2" />
              <span className="text-sm text-gray-600">
                A입장 ({myPrivatePost.faultRatePlaintiff.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#D6BCFA] mr-2" />
              <span className="text-sm text-gray-600">
                B입장 ({myPrivatePost.faultRateDefendant.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Judgement Text Box */}
      <div className="bg-white rounded">
        <div className="p-4 font-light text-base text-gray-700">
          {myPrivatePost.judgement}
        </div>
      </div>
    </div>
  );
}