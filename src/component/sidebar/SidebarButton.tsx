interface SidebarButtonProps {
    label: string;
    goto: string;
}

export default function SidebarButton(props: SidebarButtonProps){

    function handleClick(){
        window.location.href=props.goto;
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="w-full bg-slate-200 hover:bg-slate-300 text-xs text-left p-2 rounded-md leading-none"
            >
                {props.label}
            </button>
        </>
    )
}