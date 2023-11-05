"use client";

import { createSlice } from "@reduxjs/toolkit";

interface Data {
  data: Array<any>;
}

const initialState: Data = {
  data: [],
};

export const dataSlice = createSlice({
  name: "dataDB",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getData } = dataSlice.actions;

export default dataSlice.reducer;
