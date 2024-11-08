import React from "react";

interface MyPrivatePostDetailContentProps {
  children: React.ReactNode;
}

export default function MyPrivatePostDetailContent({children}: MyPrivatePostDetailContentProps) {
  return (
    <div className="bg-white mb-4 py-8 px-4 font-light text-m text-left rounded">
      {children}
    </div>
  );

}