"use client";

import { createSlice } from "@reduxjs/toolkit";

interface EditTask {
  boardId: string;
  taskId: string;
  colId: string;
}

interface BoardActive {
  activeBoard: string;
  editTask: EditTask;
}

const initialState: BoardActive = {
  activeBoard: "",
  editTask: { boardId: "", taskId: "", colId: "" },
};

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  reducers: {
    payloadBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
    payloadEditTask: (state, action) => {
      state.editTask = action.payload;
    },
  },
});

export const { payloadBoard } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
