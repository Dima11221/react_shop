import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/Types.ts";

const loadUsersFromLocalStorage = (): IUser[] => {
  const users = localStorage.getItem('users');
  if (users) {
    return  JSON.parse(users);
  } else {
    return [];
  }
}

const loadUserFromLocalStorage = (): IUser | null => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    return JSON.parse(currentUser);
  } else {
    return null;
  }

  // const sessionDuration = 7*24*60*60*1000;
  // const sessionDuration = 1000
  // const userSession = Date.now() - user.lastLogin;
  // if (user.lastLogin && userSession > sessionDuration) {
  //   localStorage.removeItem('currentUser');
  //   return null;
  // }

}

interface IAuthState {
  user: IUser | null;
  users: IUser[] | [];
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: loadUserFromLocalStorage(),
  users: loadUsersFromLocalStorage(),
  isAuth: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.error = null;
      state.user = {...action.payload, lastLogin: Date.now()};
      localStorage.setItem('currentUser', JSON.stringify(state.user));
      state.isAuth = true;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('currentUser');
      state.loading = false;
      state.isAuth = false;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<IUser>) => {
      const newUser = action.payload;
      // const currentUser = Array.isArray(state.users) ? state.users : [];
      state.users = [...state.users, newUser];
      localStorage.setItem('users', JSON.stringify(state.users));
      state.error = null;
      state.loading = false;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: () => {

  }
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  registerStart,
  registerSuccess,
  registerFail,
} = authSlice.actions;

export default authSlice.reducer;