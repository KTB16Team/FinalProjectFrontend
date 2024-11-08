interface BodyProps {
  children: React.ReactNode;
  className?: string; // 선택적인 className prop 추가
  style?: React.CSSProperties; // 선택적인 style prop 추가
}

export default function Body({ children, className, style }: BodyProps) {
  return (
    <div
      className={`w-full p-4 ${className ? className : ''}`}
      style={{
        paddingTop: "16vh",
        height: "100vh",
        overflowY: "scroll",
        ...style
      }}
    >
      {children}
    </div>
  );
}