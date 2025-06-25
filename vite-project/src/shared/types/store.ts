import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "../../features/shop/shopSlice.ts";
import authSlice from "../../features/auth/authSlice.ts";

const store = configureStore({
  reducer: {
    shop: shopSlice,
    auth: authSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};