import React from "react";

type ButtonProps = {
  color: string;    // 버튼의 배경색
  textColor: string; // 버튼의 텍스트 색상
  width: string;    // 버튼의 가로 길이
  label: string;    // 버튼에 표시할 이름(텍스트)
  onClick?: () => void;  // 버튼 클릭 시 실행할 함수
  type: 'button' | 'submit' | 'reset'; // 버튼의 타입
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({color, textColor, width, label, onClick, type, ...rest}: ButtonProps) {
  return (
    <button
      className="hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={onClick}
      type={type}
      style={{
        color: textColor,
        backgroundColor: color,
        width: width,
        cursor: 'pointer',
      }}
      {...rest}
    >
      {label}
    </button>
  );
};
