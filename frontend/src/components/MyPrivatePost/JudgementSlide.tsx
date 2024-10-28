export default function JudgementSlide(
  {
    title,
    judgement,
    faultRate,
  }: {
    title: string;
    judgement?: string;
    faultRate?: number;
  }) {
  const plaintiffRate = faultRate || 0;       // 원고(A) 과실 비율
  const defendantRate = 100 - plaintiffRate;  // 피고(B) 과실 비율

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {/* 세로 막대그래프 영역 */}
      <div className="flex justify-around items-end h-40 mb-4">
        {/* 원고(A) 막대 */}
        <div className="flex flex-col items-center h-full">
          <div className="flex items-end"
               style={{
                 height: "70%"
               }}
          >
            <div
              className="bg-red-500 w-8"
              style={{
                height: `${plaintiffRate}%`, // 원고 과실 비율에 따른 높이 설정
                minHeight: "10px",            // 최소 높이 지정
              }}
            />
          </div>
          <div className="mt-2">{plaintiffRate}%</div>
          <div className='text-sm'>A 과실</div>
        </div>

        {/* 피고(B) 막대 */}
        <div className="flex flex-col items-center h-full">
          <div className="flex items-end"
               style={{
                 height: "70%"
               }}
          >
            <div
              className="bg-green-500 w-8"
              style={{
                height: `${defendantRate}%`, // 원고 과실 비율에 따른 높이 설정
                minHeight: "10px",            // 최소 높이 지정
              }}
            />
          </div>

          <div className="mt-2">{defendantRate}%</div>
          <div className='text-sm'>B 과실</div>
        </div>
      </div>

      {/* 판결문 내용 */}
      <p className="text-base">{judgement || "Loading..."}</p>
    </div>
  );
}
