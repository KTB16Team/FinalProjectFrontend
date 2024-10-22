import React from "react";
import {Link} from "react-router-dom";

interface BodyProps {
  children: React.ReactNode; // 외부에서 전달된 요소들을 받기 위한 타입 정의
  title: string;
  url: string;
}

export default function HomepageSection({children, title, url}: BodyProps) {
  return (
    <div className="w-full border-b border-gray-300 p-3 mb-2 pb-8">
      <div className="flex flex-row justify-between mb-2">
        <div className="text-left font-semibold">{title}</div>
        <Link to={url} className="float-right">더보기</Link>
      </div>
      {children}
    </div>
  );
}