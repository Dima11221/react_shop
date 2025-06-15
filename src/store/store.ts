import {configureStore} from "@reduxjs/toolkit";
import shopSlice from "./reducers/shopSlice.ts";
import authSlice from "./reducers/authSlice.ts";

const store = configureStore({
  reducer: {
    shop: shopSlice,
    auth: authSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};