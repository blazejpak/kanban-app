"use client";

import { configureStore } from "@reduxjs/toolkit";
import activeMenuSlice from "./reducers/activeMenuSlice";
import activeBoardSlice from "./reducers/activeBoardSlice";
import dataSlice from "./reducers/dataSlice";

export const store = configureStore({
  reducer: {
    activeMenuSlice: activeMenuSlice,
    activeBoardSlice: activeBoardSlice,
    dataSlice: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
