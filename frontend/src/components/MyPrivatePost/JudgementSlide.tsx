export default function JudgementSlide(
  {
    judgement,
    faultRate,
  }: {
    judgement?: string;
    faultRate?: number;
  }) {
  const plaintiffRate = faultRate || 0;      
  const defendantRate = 100 - plaintiffRate;  

  return (
    <div>
      {/* 그래프 박스 */}
      <div className="bg-white p-4 mb-4 rounded">
        <div className="flex justify-center space-x-16 py-8">
          {/* A입장 */}
          <div className="flex flex-col items-center">
            <div 
              className="rounded-t-full w-10 bg-[#9F7AEA]" 
              style={{
                height: '200px'
              }}
            />
            <div className="mt-4 text-2xl font-bold">{plaintiffRate}%</div>
            <div className="mt-1 text-[#9F7AEA]">A입장</div>
          </div>

          {/* B입장 */}
          <div className="flex flex-col items-center">
            <div 
              className="rounded-t-full w-10 bg-[#D6BCFA]" 
              style={{
                height: '10px'
              }}
            />
            <div className="mt-4 text-2xl font-bold">{defendantRate}%</div>
            <div className="mt-1 text-[#D6BCFA]">B입장</div>
          </div>
        </div>
      </div>

      {/* 판결문 박스 - 완전히 분리된 새로운 박스 */}
      <div className="bg-white p-4 rounded">
        <div className="mb-4 font-light text-m text-left">
          {judgement || "Loading..."}
        </div>
      </div>
    </div>
  );
}