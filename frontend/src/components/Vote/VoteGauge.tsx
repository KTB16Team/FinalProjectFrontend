interface VoteGaugeProps {
  voteRatePlaintiff: number;
  voteRateDefendant: number;
}

export default function VoteGauge({ voteRatePlaintiff, voteRateDefendant }: VoteGaugeProps) {
  // 전체 투표 수 계산
  const totalVotes = voteRatePlaintiff + voteRateDefendant;

  // 투표수를 퍼센트로 환산하고 최소값 5%, 최대값 95%로 제한
  const calculatePercentage = (value: number) => {
    if (totalVotes === 0) return 0;
    const percentage = (value / totalVotes) * 100;
    return Math.min(Math.max(percentage, 5), 95);
  };

  const plaintiffPercentage = calculatePercentage(voteRatePlaintiff);
  const defendantPercentage = calculatePercentage(voteRateDefendant);

  // 투표 수 및 퍼센트 표시용 데이터
  const plaintiffDisplayPercentage = totalVotes > 0 ? ((voteRatePlaintiff / totalVotes) * 100).toFixed(1) : '0.0';
  const defendantDisplayPercentage = totalVotes > 0 ? ((voteRateDefendant / totalVotes) * 100).toFixed(1) : '0.0';

  return (
    <div>
      {totalVotes === 0 ? (
        <div className="text-center text-sm text-gray-600 mt-3">
          진행된 투표가 없습니다.
        </div>
      ) : (
        <>
          <div className="mt-3 h-1 flex w-full">
            <div className="bg-red-400 rounded-l-xl" style={{ width: `${plaintiffPercentage}%` }} />
            <div className="bg-blue-400 rounded-r-xl" style={{ width: `${defendantPercentage}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <div>
              A<span className="text-xs"> ({voteRatePlaintiff}표, {plaintiffDisplayPercentage}%)</span>
            </div>
            <div>
              <span className="text-xs">({voteRateDefendant}표, {defendantDisplayPercentage}%) </span>B
            </div>
          </div>
        </>
      )}
    </div>
  );
}
