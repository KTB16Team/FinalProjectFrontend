type BottomButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const BottomButton = ({
  label,
  onClick,
  disabled = false,
  className = "",
}: BottomButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-2 border-t bg-white z-10">
      <button
        className={`w-full rounded-lg flex items-center justify-center ${
          disabled 
            ? 'bg-gray-200 text-gray-500' 
            : 'bg-red-500 text-white hover:bg-red-600'
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default BottomButton;