import { ReactNode } from "react";
import Button from "../button/Button";
import TextField from "../textfield/TextField";

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
    <div className="overflow-x-auto text-xs h-full">
      <TableControl />
      <table className="min-w-full border-collapse rounded-md">
        <TableHeader columns={columns} actions={enableAction}/>
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} actions={enableAction}/>
          ))}
        </tbody>
      </table>
      <TableFooter />
    </div>
  );
}

type TableHeaderProps<T> = {
  columns: Column<T>[];
  actions?: boolean;
};

function TableHeader<T>({ columns, actions }: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className="bg-gray-100 sticky top-16">
        {columns.map((column) => (
          <th key={String(column.key)} className="border-x border-b p-2">
            <Button variant="table" label={column.header} icon="sort" />
          </th>
        ))}
        {actions && (
          <th>More</th>
        )}
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
  actions
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
        <td className="border-y p-2 flex justify-center">
          <Button label="" variant="table" icon="dots"/>
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
    <div className="w-full h-16 px-4 bg-gray-100 border rounded-t-md border-gray-200 flex justify-between items-center sticky top-0">
      <div className="w-1/3">
        <TextField label="" placeholder="Search..." />
      </div>
      <div className="w-fit flex gap-3">
        <Button color="neutral" label="Filter" onClick={() => alert("shesh")} />
        <Button color="neutral" label="View" icon="adjustment"/>
        <Button color="neutral" label="" icon="printer"/>
        <Button color="neutral" label="" icon="pdf"/>
      </div>
    </div>
  );
}

function TableFooter() {
  return (
    <div className="w-full h-12 px-4 bg-gray-100 border rounded-b-md border-gray-200 flex justify-end items-center gap-2.5 sticky bottom-0">
      <Button color="neutral" label="" icon="chevronDoubleLeft"/>
      <Button color="neutral" label="" icon="chevronLeft"/>
      <span>5/10</span>
      <Button color="neutral" label="" icon="chevronRight"/>
      <Button color="neutral" label="" icon="chevronDoubleRight"/>
    </div>
  );
}
