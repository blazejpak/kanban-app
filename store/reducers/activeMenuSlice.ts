"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MenuActive {
  isActive: boolean;
}

const initialState: MenuActive = {
  isActive: false,
};

export const activeMenuSlice = createSlice({
  name: "activeMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleMenu } = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
