import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as ingredientsReducer } from './slices/ingredient.slice';
import { reducer as constructorReducer } from './slices/constructor.slice';
import { reducer as userReducer } from './slices/user.slice';
import { reducer as orderReducer } from './slices/order.slice';
import { reducer as ordersReducer } from './slices/orders.slice';
import { reducer as feedReducer } from './slices/feed.slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  constructors: constructorReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer,
  feed: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
