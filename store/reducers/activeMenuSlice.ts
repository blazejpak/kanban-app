"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MenuActive {
  isActiveMenu: boolean;
  isActiveForm: boolean;
  whatType: string;
  deleteBoard: boolean;
  editBoard: boolean;
}

const initialState: MenuActive = {
  isActiveMenu: false,
  isActiveForm: false,
  whatType: "board",
  deleteBoard: false,
  editBoard: false,
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
    toggleEditBoard: (state) => {
      state.editBoard = !state.editBoard;
    },
  },
});

export const {
  toggleMenu,
  toggleForm,
  typeForm,
  toggleDeleteBoard,
  toggleEditBoard,
} = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
