import { ITask } from "../interface/common";

export const taskData: ITask[] = [
  { id: 1, name: 'Task 1', status: 'complete', parentId: undefined },
    { id: 2, name: 'Task 2', status: 'in progress', parentId: undefined },
    { id: 3, name: 'Task 3', status: 'done', parentId: undefined },
    { id: 4, name: 'Subtask 1.1', status: 'complete', parentId: '1' },
    { id: 5, name: 'Subtask 1.2', status: 'in progress', parentId: '1' },
    { id: 6, name: 'Subtask 2.1', status: 'complete', parentId: '2' },
    { id: 7, name: 'Subtask 2.2', status: 'done', parentId: '2' },
    { id: 8, name: 'Task 4', status: 'complete', parentId: undefined },
    { id: 9, name: 'Task 5', status: 'in progress', parentId: undefined },
    { id: 10, name: 'Task 6', status: 'done', parentId: undefined },
    { id: 11, name: 'Subtask 4.1', status: 'complete', parentId: '4' },
    { id: 12, name: 'Subtask 4.2', status: 'in progress', parentId: '4' },
    { id: 13, name: 'Subtask 5.1', status: 'complete', parentId: '5' },
    { id: 14, name: 'Subtask 5.2', status: 'done', parentId: '5' },
    { id: 15, name: 'Task 7', status: 'complete', parentId: undefined },
    { id: 16, name: 'Task 8', status: 'in progress', parentId: undefined },
    { id: 17, name: 'Task 9', status: 'done', parentId: undefined },
    { id: 18, name: 'Subtask 7.1', status: 'complete', parentId: '7' },
    { id: 19, name: 'Subtask 7.2', status: 'in progress', parentId: '7' },
    { id: 20, name: 'Subtask 8.1', status: 'done', parentId: '8' },
]
