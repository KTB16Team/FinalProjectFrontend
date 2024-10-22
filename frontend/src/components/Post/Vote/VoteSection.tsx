import React, { useState } from 'react';

const VoteSection: React.FC = () => {
  // 투표 상태를 관리
  const [votes, setVotes] = useState({ A: 0, B: 0 });
  const [voted, setVoted] = useState(false); // 투표 여부 관리
  const totalVotes = votes.A + votes.B;

  // 투표 클릭 시 상태 업데이트
  const handleVote = (option: 'A' | 'B') => {
    setVotes((prevVotes) => ({ ...prevVotes, [option]: prevVotes[option] + 1 }));
    setVoted(true);
  };

  // 투표 비율 계산
  const percentage = (optionVotes: number) => {
    return totalVotes === 0 ? 0 : ((optionVotes / totalVotes) * 100).toFixed(2);
  };

  return (
    <div>
      {!voted ? (
        <div>
          <h2>투표하기</h2>
          <button onClick={() => handleVote('A')}>A</button>
          <button onClick={() => handleVote('B')}>B</button>
        </div>
      ) : (
        <div>
          <h2>투표 결과</h2>
          <p>A: {votes.A}표 ({percentage(votes.A)}%)</p>
          <p>B: {votes.B}표 ({percentage(votes.B)}%)</p>
          <p>총 투표 인원: {totalVotes}</p>
        </div>
      )}
    </div>
  );
};

export default VoteSection;