import { IDropdown } from "../../interface/common";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  errors?: boolean;
  options: IDropdown[];
}

export default function Select(props: SelectProps) {
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-1 text-xs">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <select
          {...props}
          className={`w-full h-8 rounded-md px-1.5 py-0 outline-none focus:ring-0 border ${
            props.errors ? "border-red-600" : "border-slate-300"
          } focus:border-slate-400 text-xs`}
        >
          {props.options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        {props.errors && <p className="leading-none text-red-600">Required</p>}
      </div>
    </>
  );
}
