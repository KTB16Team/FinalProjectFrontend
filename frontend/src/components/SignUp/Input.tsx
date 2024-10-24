import {UseFormRegisterReturn} from 'react-hook-form';
import React from "react";
import RequiredInputIcon from "@/components/SignUp/RequiredInputIcon.tsx"; // react-hook-form의 register 반환 타입

type InputProps = {
  label: React.ReactNode;
  type: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register: UseFormRegisterReturn; // react-hook-form의 register 메서드에서 반환된 것
};

export default function Input({label, type, placeholder, error, register, required}: InputProps) {
  return (
    <div>
      <div className="text-left">
        {label}{required && <RequiredInputIcon/>}
      </div>
      <input
        className={`w-full border-b
          ${error ? 'border-red-600' : 'border-gray-300'}
          `}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      <div className="text-red-600 h-7 text-sm text-left">
        {error && <p>{error}</p>} {/* 에러 메시지 표시 */}
      </div>
    </div>
  );
};
