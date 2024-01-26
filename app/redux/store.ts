import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./taskSlice";
import { taskApi } from "./api/task";

export const store = configureStore({
    reducer: {
        task: taskReducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch