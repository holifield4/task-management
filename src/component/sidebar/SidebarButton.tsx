import { useLocation, useNavigate } from "react-router-dom";

interface SidebarButtonProps {
  label: string;
  goto: string;
}

export default function SidebarButton(props: SidebarButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <button
        onClick={() => navigate(props.goto)}
        className={`w-full ${
          location.pathname === props.goto
            ? "bg-slate-200"
            : "bg-slate-100 hover:scale-[1.03]"
        } text-xs text-left p-2 rounded-md leading-none transition-all`}
      >
        {props.label}
      </button>
    </>
  );
}
