import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getLoginData,
  getRegisterData,
  checkUserData,
  logoutUserThunk,
  getUser,
  updateUser
} from '../asyncFetch/AsyncFetch';
import { deleteCookie, getCookie } from '../../utils/cookie';

export type TUserState = {
  user: TUser | null;
  registerLoading: boolean;
  registerError: string;
  loginLoading: boolean;
  loginError: string;
  profileLoading: boolean;
  profileError: string;
  isAuth: boolean;
  updateError: string;
};

const initialState: TUserState = {
  user: null,
  registerLoading: false,
  registerError: '',
  loginLoading: false,
  loginError: '',
  profileLoading: false,
  profileError: '',
  isAuth: false,
  updateError: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuth = true;
      console.log(getCookie('accessToken'));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserData.fulfilled, (state, { payload: action }) => {
        state.isAuth = true;
      })
      .addCase(checkUserData.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(getRegisterData.pending, (state) => {
        state.registerLoading = true;
        state.registerError = '';
      })
      .addCase(getRegisterData.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = JSON.parse(
          JSON.stringify(action.payload)
        ).message;
      })
      .addCase(getRegisterData.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.user = action.payload;
      })
      .addCase(getLoginData.pending, (state) => {
        state.loginLoading = true;
        state.loginError = '';
      })
      .addCase(getLoginData.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = JSON.parse(JSON.stringify(action.payload)).message;
      })
      .addCase(getLoginData.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.profileLoading = true;
        state.loginError = '';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.profileLoading = false;
        localStorage.clear();
        deleteCookie('accessToken');
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.profileLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.profileLoading = false;
        state.updateError = action.error.message || '';
      });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuth,
    userDataSelector: (state) => state.user,
    getErrorRegister: (state) => state.registerError,
    getLoadingRegister: (state) => state.registerLoading,
    getErrorLogin: (state) => state.loginError,
    getLoadingLogin: (state) => state.loginLoading,
    getLoadingProfile: (state) => state.profileLoading,
    selectUpdateError: (state) => state.updateError
  }
});

export const { reducer } = userSlice;
export const { authChecked } = userSlice.actions;
export const {
  isAuthCheckedSelector,
  userDataSelector,
  getErrorRegister,
  getLoadingRegister,
  getErrorLogin,
  getLoadingLogin,
  getLoadingProfile
} = userSlice.selectors;
