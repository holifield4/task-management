import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  shadow?: boolean;
}

export default function Section({ title, children, shadow }: SectionProps) {
  return (
    <>
      <div className={`w-full flex flex-col rounded-md bg-gray-300 ${shadow && "shadow-sm shadow-gray-400"}`}>
        <span className="pt-4 pl-4 text-sm font-semibold text-gray-500 leading-none">{title}</span>
        <div className="p-5">
            {children}
        </div>
      </div>
    </>
  );
}
