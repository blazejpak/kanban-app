"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MenuActive {
  isActiveMenu: boolean;
  isActiveForm: boolean;
  whatType: string;
  deleteBoard: boolean;
  editBoard: boolean;
  deleteTask: boolean;
  editTask: boolean;
  newTask: boolean;
  checkTask: boolean;
}

const initialState: MenuActive = {
  isActiveMenu: false,
  isActiveForm: false,
  whatType: "board",
  deleteBoard: false,
  editBoard: false,
  deleteTask: false,
  editTask: false,
  newTask: false,
  checkTask: false,
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
    toggleDeleteTask: (state, action) => {
      state.deleteTask = action.payload;
    },
    toggleEditTask: (state) => {
      state.editTask = !state.editTask;
    },
    toggleNewTask: (state) => {
      state.newTask = !state.newTask;
    },
    toggleCheckTask: (state) => {
      state.checkTask = !state.checkTask;
    },
  },
});

export const {
  toggleMenu,
  toggleForm,
  typeForm,
  toggleDeleteBoard,
  toggleEditBoard,
  toggleNewTask,
  toggleCheckTask,
  toggleDeleteTask,
  toggleEditTask,
} = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
