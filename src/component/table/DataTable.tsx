import { ReactNode } from "react";
import Button, { CustomButton } from "../button/Button";
import TextField from "../textfield/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  changeTaskStatus,
  setFilter,
  setPagination,
  setSort,
  setViews,
} from "../../store/table/tableSlice";
import { pageSize, taskStatusOptions } from "../../lib/constant/constant";
import CustomDropdown from "../custom-dropdown/CustomDropdown";
import { IDropdown, ITask } from "../../interface/common";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import Icon from "../../lib/icon/Icon";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  enableAction?: boolean;
};

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  enableAction,
}: DataTableProps<T>) {
  return (
    <div className="text-xs h-full overflow-hidden flex flex-col">
      <TableControl />
      <div className="w-full max-h-[calc(100%-7rem)] overflow-auto">
        <table className="min-w-full border-collapse border-x rounded-md">
          <TableHeader columns={columns} actions={enableAction} />
          <tbody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                columns={columns}
                actions={enableAction}
              />
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter />
    </div>
  );
}

type TableHeaderProps<T> = {
  columns: Column<T>[];
  actions?: boolean;
};

function TableHeader<T>({ columns, actions }: TableHeaderProps<T>) {
  const dispatch = useDispatch();
  const { visibleColumn } = useSelector((state: RootState) => state.table);
  return (
    <thead>
      <tr className="bg-gray-200 sticky top-0">
        {columns.map((column) => {
          if (visibleColumn.includes(column.key as keyof ITask)) {
            return (
              <th
                key={String(column.key)}
                className={`p-3 ${
                  column.key === "status" && "flex justify-center"
                }`}
              >
                <Button
                  variant="table"
                  label={column.header}
                  icon="sort"
                  onClick={() => dispatch(setSort(String(column.key)))}
                />
              </th>
            );
          }
        })}
        {actions && <th>More</th>}
      </tr>
    </thead>
  );
}

type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
  actions?: boolean;
};

function TableRow<T extends { id: number }>({
  row,
  columns,
  actions,
}: TableRowProps<T>) {
  const { visibleColumn } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();
  return (
    <tr key={row.id}>
      {columns.map((column) => {
        if (visibleColumn.includes(column.key as keyof ITask)) {
          return (
            <TableCell
              key={String(column.key)}
              value={row[column.key]}
              render={column.render}
            />
          );
        }
      })}
      {actions && (
        <td className="border p-2">
          <div className="w-full h-full flex justify-center">
            <Dropdown
              label=""
              inline
              renderTrigger={() => <span className="hover:cursor-pointer"><Icon icon="dots"/></span>}
            >
              <DropdownHeader><span className="text-slate-500 font-semibold">Change Task Status</span></DropdownHeader>
              <DropdownItem onClick={() => dispatch(changeTaskStatus({id: row.id, status: 'in progress'}))}>In Progress</DropdownItem>
              <DropdownItem onClick={() => dispatch(changeTaskStatus({id: row.id, status: 'complete'}))}>Complete</DropdownItem>
              <DropdownItem onClick={() => dispatch(changeTaskStatus({id: row.id, status: 'done'}))}>Done</DropdownItem>
            </Dropdown>
          </div>
        </td>
      )}
    </tr>
  );
}

type TableCellProps<T> = {
  value: T;
  render?: (value: T) => ReactNode;
};

function TableCell<T>({ value, render }: TableCellProps<T>) {
  return (
    <td className={`border p-2 capitalize ${render && "text-center"}`}>
      {render ? render(value) : value ? String(value) : "Not Available"}
    </td>
  );
}

function TableControl() {
  const { data, visibleColumn } = useSelector(
    (state: RootState) => state.table
  );
  const dispatch = useDispatch();
  const viewOptions: IDropdown[] = Object.keys(data?.[0] || {}).map((key) => ({
    name: key,
    value: key,
  }));
  return (
    <div className="w-full h-16 px-4 bg-gray-100 border rounded-t-md border-gray-200 flex justify-between items-center">
      <div className="w-1/3">
        <TextField
          label=""
          placeholder="Search..."
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
      </div>
      <div className="w-fit flex gap-3">
        <CustomDropdown
          label="Status"
          options={[{ name: "All", value: "All" } as IDropdown].concat(
            taskStatusOptions
          )}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        <CustomButton
          label="View"
          icon="adjustment"
          options={viewOptions}
          checkedOptions={visibleColumn}
          onChecked={(e) => dispatch(setViews(e as (keyof ITask)[]))}
        />
        <Button
          color="neutral"
          label=""
          icon="printer"
          onClick={() => console.log(visibleColumn)}
        />
        <Button color="neutral" label="" icon="pdf" />
      </div>
    </div>
  );
}

function TableFooter() {
  const tableData = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();
  return (
    <div className="w-full h-12 px-4 bg-gray-100 border rounded-b-md border-gray-200 flex justify-end items-center gap-2.5">
      <div className="w-fit flex gap-2.5 items-center">
        <span>Show</span>
        <CustomDropdown
          label=""
          options={pageSize}
          value={tableData.rowsPerPage}
          onChange={(e) =>
            dispatch(
              setPagination({
                control: "pageSize",
                pageSize: Number(e.target.value),
              })
            )
          }
        />
      </div>
      <Button
        color="neutral"
        label=""
        icon="chevronDoubleLeft"
        disabled={tableData.currentPage === 1}
        onClick={() => dispatch(setPagination({ control: "firstPage" }))}
      />
      <Button
        color="neutral"
        label=""
        icon="chevronLeft"
        disabled={tableData.currentPage === 1}
        onClick={() => dispatch(setPagination({ control: "previousPage" }))}
      />
      <span>
        {tableData.currentPage} / {tableData.totalPages}
      </span>
      <Button
        color="neutral"
        label=""
        icon="chevronRight"
        disabled={tableData.currentPage === tableData.totalPages}
        onClick={() => dispatch(setPagination({ control: "nextPage" }))}
      />
      <Button
        color="neutral"
        label=""
        icon="chevronDoubleRight"
        disabled={tableData.currentPage === tableData.totalPages}
        onClick={() => dispatch(setPagination({ control: "lastPage" }))}
      />
    </div>
  );
}
