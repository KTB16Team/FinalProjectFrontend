import styled from "styled-components";

type BottomButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string; 
};

export default function BottomButton({
  label,
  onClick,
  disabled = true,
  className = "", // className 기본값 추가
}: BottomButtonProps) {
  return (
    <Button
      className={`${className} fixed bottom-0 w-full flex flex-row justify-center ${
        disabled ? "bg-gray-300 text-black" : "bg-mainColor text-white"
      }`}
      onClick={onClick}
      disabled={disabled} // 버튼 비활성화 상태 전달
    >
      {label}
    </Button>
  );
}

const Button = styled.button`
  height: 10vh;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;