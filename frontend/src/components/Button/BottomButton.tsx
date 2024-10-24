import styled from "styled-components";

type BottomButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function BottomButton({label, onClick, disabled = true}: BottomButtonProps) {
  return (
    <Button
      className={`fixed bottom-0 w-full flex flex-row bg-black justify-center ${
        disabled ? "bg-mainColor text-white" : "bg-gray-300 text-black"
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

const Button = styled.button`
    height: 10vh;
`