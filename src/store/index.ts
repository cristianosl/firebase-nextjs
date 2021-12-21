import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './count'
import { queueReducer } from "./queue";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    queue: queueReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
