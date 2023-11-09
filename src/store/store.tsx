import { configureStore } from "@reduxjs/toolkit";
import { postsAPI } from "../services/postsAPI";

export const store = configureStore({
  reducer: {
    [postsAPI.reducerPath]: postsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsAPI.middleware),
});
