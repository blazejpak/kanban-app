"use client";

import { configureStore } from "@reduxjs/toolkit";
import activeMenuSlice from "./reducers/activeMenuSlice";
import activeBoardSlice from "./reducers/activeBoardSlice";

export const store = configureStore({
  reducer: {
    activeMenuSlice: activeMenuSlice,
    activeBoardSlice: activeBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
