import { IDropdown } from "../../interface/common";

interface CustomDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: IDropdown[];
}

export default function CustomDropdown(props: CustomDropdownProps) {
  return (
    <>
      <div className="w-fit h-fit flex gap-2 text-xs items-center">
        <label htmlFor={props.id}>{props.label}</label>
        <select
          {...props}
          className={`w-fit h-8 rounded-md px-2 py-0 outline-none border border-slate-300 bg-gray-100
           focus:border-slate-400 focus:ring-0 text-xs`}
        >
          {props.options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
