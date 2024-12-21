import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./table/tableSlice";

export const store = configureStore({
    reducer: {
        table: tableReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;