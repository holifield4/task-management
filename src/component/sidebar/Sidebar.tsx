import SidebarButton from "./SidebarButton";

export default function Sidebar(){
    return(
        <nav className="col-span-1 border-r border-slate-300 bg-slate-100 h-[calc(100vh-40px)] select-none">
            <div className="w-full h-12 p-1 border-b border-slate-300 flex items-center justify-center tracking-widest font-semibold text-lg">
                <h2>Aphrodite&#8482;</h2>
            </div>
            <ul className="w-full h-fit flex flex-col gap-1 p-1.5">
                <p className="font-semibold text-xs text-gray-500">Services</p>
                <SidebarButton label="Task Management" goto="/props"/>
                <SidebarButton label="Milestone" goto="/props"/>
                <SidebarButton label="Project Management" goto="/props"/>
            </ul>
        </nav>
    )
}