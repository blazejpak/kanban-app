"use client";

import { configureStore } from "@reduxjs/toolkit";
import activeMenuSlice from "./reducers/activeMenuSlice";

export const store = configureStore({
  reducer: {
    activeMenuSlice: activeMenuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
