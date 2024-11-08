import {Cell, Pie, PieChart} from 'recharts';
import {JudgementSlideForm} from "@/types/myPrivatePostForm.ts";

interface JudgementSlideProps {
  judgementSlideForm: JudgementSlideForm;
}

export default function JudgementSlide({judgementSlideForm}: JudgementSlideProps) {

  const data = [
    { name: 'A 과실', value: judgementSlideForm.faultRatePlaintiff },
    { name: 'B 과실', value: judgementSlideForm.faultRateDefendant },
  ];

  const COLORS = ['#9F7AEA', '#D6BCFA'];

  const higherPartyLabel = judgementSlideForm.faultRatePlaintiff > judgementSlideForm.faultRateDefendant ? 'A 과실' : 'B 과실';

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
                {Math.max(judgementSlideForm.faultRatePlaintiff, judgementSlideForm.faultRateDefendant).toFixed(1)}%
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
                A 과실 ({judgementSlideForm.faultRatePlaintiff.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#D6BCFA] mr-2" />
              <span className="text-sm text-gray-600">
                B 과실 ({judgementSlideForm.faultRateDefendant.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Judgement Text Box */}
      <div className="bg-white rounded">
        <div className="p-4 font-light text-base text-gray-700">
          {judgementSlideForm.judgement}
        </div>
      </div>
    </div>
  );
}