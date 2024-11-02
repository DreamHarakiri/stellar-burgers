import { expect, describe } from '@jest/globals';
import {
  initialState,
  reducer,
  setOrderRequest
} from '../../src/services/slices/orders.slice';
import { fetchOrders } from '../../src/services/asyncFetch/AsyncFetch';
import { orderList } from '../test-constaints';

describe('[OrdersSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Выставить request в true', () => {
      const newState = reducer(initialState, setOrderRequest(true));
      const { request } = newState;
      expect(request).toBe(true);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение списка заказов / Request', () => {
      const newState = reducer(initialState, {
        type: fetchOrders.fulfilled.type,
        payload: orderList
      });
      const { orders } = newState;
      expect(orders).toEqual(orderList);
    });
  });
});
