"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MenuActive {
  isActiveMenu: boolean;
  isActiveForm: boolean;
  whatType: string;
  deleteBoard: boolean;
}

const initialState: MenuActive = {
  isActiveMenu: false,
  isActiveForm: false,
  whatType: "board",
  deleteBoard: false,
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
    typeForm: (state, action) => {
      state.whatType = action.payload;
    },
    toggleDeleteBoard: (state) => {
      state.deleteBoard = !state.deleteBoard;
    },
  },
});

export const { toggleMenu, toggleForm, typeForm, toggleDeleteBoard } =
  activeMenuSlice.actions;

export default activeMenuSlice.reducer;
