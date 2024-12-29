import { useEffect, useState } from "react";
import Icon from "../../lib/icon/Icon";
import { IDropdown } from "../../interface/common";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: "primary" | "neutral" | "danger";
  variant?: "normal" | "table";
  icon?: string;
  options?: IDropdown[];
  checkedOptions?: string[];
  onChecked?: (checked: string[]) => void;
}

export default function Button({
  color = "primary",
  variant = "normal",
  ...props
}: ButtonProps) {
  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    neutral: `border border-slate-300 ${
      props.disabled ? "cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"
    } text-black flex items-center`,
  };

  const variantClasses = {
    normal: `w-fit px-4 h-8 rounded-md text-xs tracking-wider transition-colors ${colorClasses[color]}`,
    table:
      "w-fit h-fit bg-transparent text-slate-800 hover:text-slate-500 flex gap-1 items-center justify-center transition-colors",
  };

  return (
    <>
      <button {...props} className={variantClasses[variant]}>
        {props.icon && <Icon icon={props.icon} />}
        {props.label}
      </button>
    </>
  );
}

export function CustomButton(props: ButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string[]>([]);

  //KIV
  useEffect(() => {
    if(props.checkedOptions && props.checkedOptions.length > 0){
      setChecked((prev) => prev = props.checkedOptions!)
    }
  },[props.checkedOptions?.length === 0])

  //handle when clicking button
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    props.onClick?.(e);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  //handle when checking box in dropdown
  const handleCheckboxChange = (selected: string) => {
    setChecked((prev) => {
      const isChecked = prev.includes(selected);
      return isChecked
        ? prev.filter((value) => value !== selected)
        : [...prev, selected];
    });
  };

  //handle onCheck @ kind of onChange/onClick
  useEffect(() => {
    props.onChecked?.(checked);
  }, [checked]);
  return (
    <>
      <div className="relative">
        <button
          className={`w-fit px-4 h-8 rounded-md text-xs tracking-wider transition-colors border border-slate-300 ${
            props.disabled
              ? "cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          } text-black flex items-center`}
          onClick={handleButtonClick}
        >
          {props.icon && <Icon icon={props.icon} />}
          {props.label}
        </button>
        {isOpen === true && props.options && (
          <div className="w-fit whitespace-nowrap p-2 border border-gray-500 bg-white absolute top-8 z-20 flex flex-col gap-1.5 shadow-md shadow-gray-300 capitalize">
            {props.options.map((option, index) => {
              return (
                <div
                  key={`option-${index}`}
                  className="w-full hover:bg-gray-200 flex gap-1.5 items-center rounded-sm p-1 transition-colors"
                >
                  <input
                    className="w-5 h-5 cursor-pointer"
                    type="checkbox"
                    checked={checked.includes(String(option.value))}
                    onChange={() => handleCheckboxChange(String(option.value))}
                  />
                  <label htmlFor="input" className="pr-2.5">
                    {option.name}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
