import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../interface/common";

interface DataTableSlice {
  data: ITask[];
  rowsPerPage: number;
  totalPages: number;
  currentPage: number;
  visibleColumn: (keyof ITask)[];
  filteredData: string;
}

const initialState: DataTableSlice = {
  data: [],
  rowsPerPage: 10,
  totalPages: 0,
  currentPage: 1,
  visibleColumn: [] as (keyof ITask)[],
  filteredData: "",
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<ITask[]>) => {
      if (action.payload.length > 0) {
        state.visibleColumn = Object.keys(action.payload[0]) as (keyof ITask)[];
      }
      state.totalPages = Math.ceil(action.payload.length / state.rowsPerPage);
      state.data = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{ control: string; pageSize?: number }>
    ) => {
      switch (action.payload.control) {
        case "nextPage": {
          state.currentPage += 1;
          break;
        }
        case "previousPage": {
          state.currentPage -= 1;
          break;
        }
        case "firstPage": {
          state.currentPage = 1;
          break;
        }
        case "lastPage": {
          state.currentPage = state.totalPages;
          break;
        }
        case "pageSize": {
          state.rowsPerPage = action.payload.pageSize ?? 0;
          state.totalPages = Math.ceil(state.data.length / state.rowsPerPage);
          state.currentPage = 1;
          break;
        }
        default: {
          return;
        }
      }
    },
    setSort: (state, action: PayloadAction<string>) => {
      // Check if the current data is already sorted in ascending order
      const isAscending = state.data.every(
        (row, i, arr) =>
          i === 0 ||
          (row[action.payload as keyof ITask] ?? "") >=
            (arr[i - 1][action.payload as keyof ITask] ?? "")
      );

      // Determine the new sort order
      const newSortOrder = isAscending ? "desc" : "asc";

      state.data.sort((a, b) => {
        const valueA = a[action.payload as keyof ITask];
        const valueB = b[action.payload as keyof ITask];

        if (valueA === undefined) return 1;
        if (valueB === undefined) return -1;

        if (valueA < valueB) {
          return newSortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return newSortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    },
    setFilter: (state, action: PayloadAction<string>) => {
      // state.data = state.data.filter((item) => {
      //   return Object.values(item).some((value) =>
      //     value?.toString().toLowerCase().includes(action.payload.toLowerCase())
      //   );
      // });
      // state.totalPages = Math.ceil(state.data.length / state.rowsPerPage);
      // state.currentPage = 1;
      state.filteredData = action.payload;
    },
    setViews: (state, action: PayloadAction<(keyof ITask)[]>) => {
      state.visibleColumn = action.payload;
    },
  },
});

export const { setTableData, setPagination, setSort, setFilter, setViews } =
  tableSlice.actions;

export default tableSlice.reducer;
