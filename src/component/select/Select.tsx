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
        <label htmlFor={props.id}>{props.label}</label>
        <select
          className={`w-full h-8 rounded-md px-1 outline-none border ${
            props.errors ? "border-red-600" : "border-slate-300"
          } focus:border-slate-400`}
          disabled={props.disabled}
          onClick={props.onClick}
          value={props.value}
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
