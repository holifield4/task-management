import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  shadow?: boolean;
}

export default function Section({ title, children, shadow }: SectionProps) {
  return (
    <>
      <div
        className={`w-full h-fit flex flex-col p-8 gap-6 rounded-md bg-gray-200 ${
          shadow && "shadow-sm shadow-gray-400"
        }`}
      >
        <span className="text-sm font-semibold text-gray-500 leading-none">
          {title}
        </span>
        {children}
      </div>
    </>
  );
}
