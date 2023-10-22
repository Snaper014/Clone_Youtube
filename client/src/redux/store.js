import { configureStore } from "@reduxjs/toolkit";
import { ShortSlice } from "./redux";


export const store = configureStore({
    reducer: {
      shorts: ShortSlice.reducer,
    },
  });