interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    color?: "primary" | "neutral" | "danger";
}

export default function Button({ color = "primary", ...props }: ButtonProps){

    const colorClasses = {
        primary: "bg-blue-600 hover:bg-blue-700",
        danger: "bg-red-600 hover:bg-red-700",
        neutral: "bg-green-600 hover:bg-green-700",
      };

    return(
        <>
            <button
                form={props.form}
                onClick={props.onClick}
                disabled={props.disabled}
                className={`w-fit px-4 h-8 rounded-md ${colorClasses[color]} text-xs tracking-wider text-white transition-colors`}
            >
                {props.label}
            </button>
        </>
    )
}