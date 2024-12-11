interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: boolean;
}

export default function TextField(props: TextFieldProps) {
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-1 text-xs">
        <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          className={`h-8 rounded-md outline-none px-2 border ${props.errors ? "border-red-600" : "border-slate-300"} focus:border-slate-400`}
        />
        {props.errors && <p className="leading-none text-red-600">Required</p>}
      </div>
    </>
  );
}