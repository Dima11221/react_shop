import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "./reducers/shopSlice.ts";

const store = configureStore({
  reducer: {
    shop: shopSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export {store};