export type ITask = {
    id: string;
    name: string;
    status: string;
    parentId?: string;
}

export type IDropdown = {
    name: string;
    value: string | number;
}