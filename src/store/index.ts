import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './count'
import { queueReducer } from "./queue";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    queue: queueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
