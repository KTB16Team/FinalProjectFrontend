
interface MyPrivatePostDetailTitleProps {
  children: React.ReactNode;
}

export default function MyPrivatePostDetailTitle({children}: MyPrivatePostDetailTitleProps) {
  return (
    <div
      className="bg-white mb-2 flex items-center justify-center font-semibold text-lg rounded"
      style={{
        height: "7vh",
      }}
    >
      {children}
    </div>
  );
}