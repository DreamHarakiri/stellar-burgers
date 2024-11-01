import { expect, describe } from '@jest/globals';
import {
  initialState,
  clearOrder,
  reducer
} from '../../src/services/slices/order.slice';
import { currentOrder, newOrder } from '../test-constaints';
import {
  getOrderNumber,
  getOrderBurger
} from '../../src/services/asyncFetch/AsyncFetch';

describe('[OrderSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Очистить текущий заказ', () => {
      const newState = reducer(currentOrder, clearOrder());
      const { data } = newState;
      expect(data).toBe(null);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение заказа по номеру / Request', () => {
      const newState = reducer(initialState, {
        type: getOrderNumber.pending.type
      });
      const { request } = newState;
      expect(request).toBe(true);
    });
    it('Получение заказа по номеру / Success', () => {
      const newState = reducer(initialState, {
        type: getOrderNumber.fulfilled.type,
        payload: { orders: [currentOrder] }
      });
      const { data, request } = newState;
      expect(data).toEqual(currentOrder);
      expect(request).toBe(false);
    });
    it('Получение заказа по номеру / Failed', () => {
      const newState = reducer(initialState, {
        type: getOrderNumber.rejected.type
      });
      const { request } = newState;
      expect(request).toBe(false);
    });
    it('Оформление заказа / Request', () => {
      const newState = reducer(initialState, {
        type: getOrderBurger.pending.type
      });
      const { request } = newState;
      expect(request).toBe(true);
    });
    it('Оформление заказа / Success', () => {
      const newState = reducer(initialState, {
        type: getOrderBurger.fulfilled.type,
        payload: newOrder
      });
      const { request, data } = newState;
      expect(request).toBe(false);
      expect(data).toEqual(newOrder.order);
    });
    it('Оформление заказа / Failed', () => {
      const newState = reducer(initialState, {
        type: getOrderBurger.rejected.type
      });
      const { request } = newState;
      expect(request).toBe(false);
    });
  });
});
