import { IDropdown } from "../../interface/common";

export const taskStatusOptions: IDropdown[] = [
  { name: "In Progress", value: "In Progress" },
  { name: "Done", value: "Done" },
  { name: "Complete", value: "Complete" },
];

export const pageSize: IDropdown[] = [
  {name: "5", value: 5},
  {name: "10", value: 10},
  {name: "20", value: 20},
  {name: "50", value: 50},
]