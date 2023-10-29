"use client";

import { createSlice } from "@reduxjs/toolkit";

interface BoardActive {
  activeBoard: string;
}

const initialState: BoardActive = {
  activeBoard: "",
};

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  reducers: {
    payloadBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
  },
});

export const { payloadBoard } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
