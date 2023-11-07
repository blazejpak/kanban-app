"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MenuActive {
  isActiveMenu: boolean;
  isActiveForm: boolean;
}

const initialState: MenuActive = {
  isActiveMenu: false,
  isActiveForm: false,
};

export const activeMenuSlice = createSlice({
  name: "activeMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isActiveMenu = !state.isActiveMenu;
    },
    toggleForm: (state) => {
      state.isActiveForm = !state.isActiveForm;
    },
  },
});

export const { toggleMenu, toggleForm } = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
