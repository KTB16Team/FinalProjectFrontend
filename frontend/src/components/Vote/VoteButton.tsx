import React from "react";
import VoteCheckLogo from "@/assets/imgs/VoteCheck.svg?react";

interface VoteButtonProps {
  label: string;
  selected: boolean;
  isVotingEnabled: boolean;
  onClick: () => void;
  percentage: string;
  votes: number;
}

const VoteButton: React.FC<VoteButtonProps> = ({ label, selected, isVotingEnabled, onClick, percentage, votes }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-xl mb-2 text-sm relative ${
        selected ? "bg-blue-100" : "bg-white"
      }`}
      disabled={!isVotingEnabled}
      style={{
        ...(!isVotingEnabled && {
          background: `linear-gradient(to right, #E55958 ${percentage}%, #FFFFFF ${percentage}%)`,
          color: selected ? "black" : "black",
        }),
      }}
    >
      {label} {!isVotingEnabled && `(${percentage}% | ${votes})`}
      {selected && <VoteCheckLogo className="absolute right-2 top-2.5" />}
    </button>
  );
};

export default VoteButton;
