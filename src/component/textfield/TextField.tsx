interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: boolean;
}

export default function TextField(props: TextFieldProps) {
  const { label, errors, ...inputProps } = props;
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-1 text-xs">
        {label && <label htmlFor={inputProps.id}>{label}</label>}
        <input
          {...inputProps}
          className={`h-8 rounded-md outline-none px-2 border ${
            errors ? "border-red-600" : "border-slate-300"
          } focus:border-slate-400`}
        />
        {errors && <p className="leading-none text-red-600">Required</p>}
      </div>
    </>
  );
}
