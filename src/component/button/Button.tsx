import Icon from "../../lib/icon/Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: "primary" | "neutral" | "danger";
    variant?: "normal" | "table";
    icon?: string;
}

export default function Button({ color = "primary", variant = "normal", ...props }: ButtonProps){

    const colorClasses = {
        primary: "bg-blue-600 hover:bg-blue-700",
        danger: "bg-red-600 hover:bg-red-700",
        neutral: "border border-slate-300 bg-gray-100 hover:bg-gray-200 text-black flex items-center",
      };

    const variantClasses = {
        normal: `w-fit px-4 h-8 rounded-md text-xs tracking-wider text-white transition-colors ${colorClasses[color]}`,
        table: "w-fit h-fit bg-transparent text-slate-800 hover:text-slate-500 flex gap-1 items-center justify-center transition-colors"
    }

    return(
        <>
            <button
                {...props}
                className={variantClasses[variant]}
            >
                {props.icon && <Icon icon={props.icon}/>}
                {props.label}
            </button>
        </>
    )
}