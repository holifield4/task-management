import Button from "../component/button/Button";
import Section from "../component/section/Section";
import Select from "../component/select/Select";
import DataTable, { Column } from "../component/table/DataTable";
import TextField from "../component/textfield/TextField";
import { ITask } from "../interface/common";
import { taskStatusOptions } from "../lib/constant/constant";
import { taskData } from "../mocks/mockdata";

export default function Homepage() {
  const columns: Column<ITask>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
          {value}
        </span>
      ),
    },
    { key: "parentId", header: "Parent ID" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-88px)] p-2 overflow-auto bg-slate-50">
        <Section title="Section">
          <TextField label="Task Name" />
          <TextField label="Task Name" errors />
          <Select label="Status" options={taskStatusOptions} errors />
          <Select label="Status" options={taskStatusOptions} />
          <Button label="Click Here" />
          <Button label="Click Here" color="neutral" />
          <Button label="Click Here" color="danger" />
        </Section>

        <div className="w-full h-[300px] overflow-y-auto">
          <DataTable data={taskData} columns={columns} />
        </div>
      </div>
    </>
  );
}
