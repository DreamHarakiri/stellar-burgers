import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderBurger, getOrderNumber } from '../asyncFetch/AsyncFetch';

export type TOrderState = {
  data: TOrder | null;
  request: boolean;
};

const initialState: TOrderState = {
  data: null,
  request: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },

  selectors: {
    getOrder: (state) => state.data,
    getRequest: (state) => state.request
  },

  extraReducers(builder) {
    builder
      .addCase(getOrderNumber.pending, (state) => {
        state.request = true;
      })
      .addCase(getOrderNumber.rejected, (state) => {
        state.request = false;
      })
      .addCase(getOrderNumber.fulfilled, (state, action) => {
        state.request = false;
        state.data = action.payload.orders[0];
      })

      .addCase(getOrderBurger.pending, (state) => {
        state.request = true;
      })

      .addCase(getOrderBurger.rejected, (state) => {
        state.request = false;
      })

      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.request = false;
        state.data = action.payload.order;
      });
  }
});

export const { reducer } = orderSlice;
export const { clearOrder } = orderSlice.actions;
export const { getOrder, getRequest } = orderSlice.selectors;
