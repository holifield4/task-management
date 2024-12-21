import { ReactNode } from "react";
import Button from "../button/Button";
import TextField from "../textfield/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setPagination, setSort } from "../../store/table/tableSlice";
import Select from "../select/Select";
import { pageSize } from "../../lib/constant/constant";

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

export default function DataTable<T extends { id: number | string }>({
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
  return (
    <thead>
      <tr className="bg-gray-200 sticky top-0">
        {columns.map((column) => (
          <th key={String(column.key)} className="p-2">
            <Button
              variant="table"
              label={column.header}
              icon="sort"
              onClick={() =>
                dispatch(setSort(String(column.key)))
              }
            />
          </th>
        ))}
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

function TableRow<T extends { id: number | string }>({
  row,
  columns,
  actions,
}: TableRowProps<T>) {
  return (
    <tr key={row.id}>
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
        />
      ))}
      {actions && (
        <td className="border p-2">
          <div className="w-full h-full flex justify-center">
            <Button
              label=""
              variant="table"
              icon="dots"
              onClick={() => alert("dispatch something")}
            />
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
    <td className="border p-2">
      {render ? render(value) : value ? String(value) : "Not Available"}
    </td>
  );
}

function TableControl() {
  return (
    <div className="w-full h-16 px-4 bg-gray-100 border rounded-t-md border-gray-200 flex justify-between items-center">
      <div className="w-1/3">
        <TextField label="" placeholder="Search..." />
      </div>
      <div className="w-fit flex gap-3">
        <Button color="neutral" label="Filter" onClick={() => alert("shesh")} />
        <Button color="neutral" label="View" icon="adjustment" />
        <Button color="neutral" label="" icon="printer" />
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
        <Select
          label=""
          options={pageSize}
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
