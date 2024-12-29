import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import Button from "../component/button/Button";
import DataTable, { Column } from "../component/table/DataTable";
import { ITask } from "../interface/common";
import { useHomepage } from "./hooks/useHomepage";
import TextField from "../component/textfield/TextField";
import Select from "../component/select/Select";
import { taskStatusOptions } from "../lib/constant/constant";

export default function Homepage() {
  const { paginatedData, statusColor, isOpen, setIsOpen } = useHomepage();

  const columns: Column<ITask>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span className={`rounded-full px-2 py-1 ${statusColor[value!]}`}>
          {value}
        </span>
      ),
    },
    { key: "parentId", header: "Parent ID" },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col gap-3 items-end">
        <Button label="New Task" onClick={() => setIsOpen(true)} />
        <div className="w-full h-full overflow-hidden">
          <DataTable data={paginatedData} columns={columns} enableAction />
          <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const CustomModal = ({ isOpen, onClose }: CustomModalProps) => {
  return (
    <Modal show={isOpen} dismissible onClose={onClose}>
      <ModalHeader>Add new task</ModalHeader>
      <ModalBody>
        <form className="w-full flex flex-col gap-4 items-center">
          <TextField label="Task name" />
          <Select label="Parent ID" options={taskStatusOptions} />
          <Select label="Status" options={taskStatusOptions} />
        </form>
      </ModalBody>
      <ModalFooter className="justify-center">
        <Button label="Add" />
      </ModalFooter>
    </Modal>
  );
};
