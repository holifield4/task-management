import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import Button from "../component/button/Button";
import DataTable, { Column } from "../component/table/DataTable";
import { ITask } from "../interface/common";
import { useHomepage } from "./hooks/useHomepage";
import TextField from "../component/textfield/TextField";
import Select from "../component/select/Select";
import { taskStatusOptions } from "../lib/constant/constant";
import { Dispatch, SetStateAction } from "react";
import { UnknownAction } from "redux";
import { createTask } from "../store/table/tableSlice";

export default function Homepage() {
  const {
    paginatedData,
    statusColor,
    isOpen,
    setIsOpen,
    dispatch,
    form,
    setForm,
  } = useHomepage();

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
          <CustomModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            form={form}
            setForm={setForm}
            dispatch={dispatch}
          />
        </div>
      </div>
    </>
  );
}

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  form: ITask;
  setForm: Dispatch<SetStateAction<ITask>>;
  dispatch: Dispatch<UnknownAction>;
};
const CustomModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  dispatch,
}: CustomModalProps) => {
  return (
    <Modal show={isOpen} dismissible onClose={onClose}>
      <ModalHeader>Add new task</ModalHeader>
      <ModalBody>
        <form
          className="w-full flex flex-col gap-4 items-center"
        >
          <TextField
            label="Task Id"
            value={form.id}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, id: Number(e.target.value) }))
            }
          />
          <TextField
            label="Task name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Select
            label="Parent ID"
            options={taskStatusOptions}
            value={form.parentId}
          />
          <Select
            label="Status"
            options={taskStatusOptions}
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, status: e.target.value}))
            }
          />
        </form>
      </ModalBody>
      <ModalFooter className="justify-center">
        <Button label="Add" onClick={() => {dispatch(createTask(form)); onClose()}}/>
      </ModalFooter>
    </Modal>
  );
};
