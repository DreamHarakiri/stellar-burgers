import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from '../asyncFetch/AsyncFetch';

export type TOrdersState = {
  orders: TOrder[];
  request: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  request: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    selectOrdersRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { reducer } = ordersSlice;
export const { getOrders, selectOrdersRequest } = ordersSlice.selectors;
export const { setOrderRequest } = ordersSlice.actions;
