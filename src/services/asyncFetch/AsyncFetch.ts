import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  getOrderByNumberApi,
  orderBurgerApi,
  getOrdersApi,
  getFeedsApi,
  updateUserApi
} from '@api';
import { TRegisterData, TLoginData } from '@api';
import { TOrder, TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';
import { authChecked } from '../slices/user.slice';
import { clearOrder } from '../slices/order.slice';
import { clearFeed } from '../slices/feed.slice';
export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const getIngredientData = createAsyncThunk(
  'ingredients/getIngredientData',
  async () => {
    const response = await getIngredientsApi();

    return response;
  }
);

export const getRegisterData = createAsyncThunk(
  'register/getRegisterData',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLoginData = createAsyncThunk(
  'login/getLoginData',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkUserData = createAsyncThunk(
  'user/checkUserData',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await dispatch(getUser());
      console.log(getCookie('accessToken'));
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUserThunk',
  async () => logoutApi()
);

//orderThunk

export const getOrderNumber = createAsyncThunk(
  'order/getOrderNumber',
  async (orderNumber: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(orderNumber);
  }
);

export const getOrderBurger = createAsyncThunk(
  'order/getOrderBurger',
  async (id_array: string[], { dispatch }) => {
    dispatch(clearOrder());
    const response = await orderBurgerApi(id_array);
    return response;
  }
);

export const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => {
    const response = await getOrdersApi();
    console.log('Fetched orders:', response);
    return response;
  }
);

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    const response = await getFeedsApi();
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (newData: Partial<TRegisterData>) => updateUserApi(newData)
);
