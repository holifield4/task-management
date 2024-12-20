export type ITask = {
    id: number;
    name: string;
    status: string;
    parentId?: string;
}

export type IDropdown = {
    name: string;
    value: string | number;
}