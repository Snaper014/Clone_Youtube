import { createSlice } from "@reduxjs/toolkit";

export const ShortSlice = createSlice({
  name: "Shorts",
  initialState: [],
  reducers: {
    addShorts: (state, action) => {
      //const NewValue = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = action.payload;
      return state;
    },
  },
});

export const { addShorts } = ShortSlice.actions;
