import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";
import Footer from "../component/footer/Footer";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();
  return (
    <div className="w-full h-full grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 h-full flex flex-col">
        <header className="w-full h-12 bg-slate-100 border-b border-slate-300 flex items-center pl-4">
          {location.pathname === "/" ? "Task Management" : location.pathname}
        </header>
        <div className="h-[calc(100vh-88px)] px-10 py-8 overflow-auto bg-slate-50">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
