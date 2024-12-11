import Button from "../component/button/Button";
import Section from "../component/section/Section";
import Select from "../component/select/Select";
import TextField from "../component/textfield/TextField";
import { IDropdown } from "../interface/common";

export default function Homepage() {
  const options: IDropdown[] = [
    { name: "Done", value: "Done" },
    { name: "In Progress", value: "In Progress" },
    { name: "Pending", value: "Pending" },
  ];
  return (
    <>
      <div className="h-[calc(100vh-48px)] p-2 overflow-auto bg-slate-200">
        <Section title="Section">
          <TextField label="Task Name" />
          <TextField label="Task Name" />
          <TextField label="Task Name" />
          <Select label="Status" options={options} />
          <Button label="Click Here" />
          <Button label="Click Here" color="neutral" />
          <Button label="Click Here" color="danger" />
        </Section>
      </div>
    </>
  );
}
