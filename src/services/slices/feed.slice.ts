import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed } from '../asyncFetch/AsyncFetch';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    getFeed: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedData: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    })
  },
  extraReducers(builder) {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { reducer } = feedSlice;
export const { clearFeed } = feedSlice.actions;
export const { getFeed, getFeedOrders, getFeedData } = feedSlice.selectors;
