import { useDispatch, useSelector } from "react-redux";
import Button from "../component/button/Button";
import Section from "../component/section/Section";
import Select from "../component/select/Select";
import DataTable, { Column } from "../component/table/DataTable";
import TextField from "../component/textfield/TextField";
import { ITask } from "../interface/common";
import { taskStatusOptions } from "../lib/constant/constant";
import { taskData } from "../mocks/mockdata";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { setTableData } from "../store/table/tableSlice";

export default function Homepage() {
  const columns: Column<ITask>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span className="rounded-full bg-teal-100 px-2 py-1">{value}</span>
      ),
    },
    { key: "parentId", header: "Parent ID" },
  ];

  const { data, rowsPerPage, currentPage } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTableData(taskData));
  }, [dispatch]);

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Section title="Section">
          <div>
            <TextField label="Task Name" />
            <TextField label="Task Name" errors />
            <Select label="Status" options={taskStatusOptions} errors />
            <Select label="Status" options={taskStatusOptions} />
            <Button label="Click Here" />
            <Button label="Click Here" color="neutral" />
            <Button label="Click Here" color="danger" />
          </div>
        </Section>

        <div className="w-full h-full overflow-hidden">
          <DataTable data={paginatedData} columns={columns} enableAction />
        </div>
      </div>
    </>
  );
}
