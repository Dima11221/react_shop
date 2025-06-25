import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "./slices/shopSlice.ts";
import authSlice from "./slices/authSlice.ts";

const store = configureStore({
  reducer: {
    shop: shopSlice,
    auth: authSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};