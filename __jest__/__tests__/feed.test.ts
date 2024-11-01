import { expect, describe } from '@jest/globals';
import {
  clearFeed,
  reducer,
  initialState
} from '../../src/services/slices/feed.slice';
import { fetchFeed } from '../../src/services/asyncFetch/AsyncFetch';
import { feedFullState } from '../test-constaints';

describe('[FeedSlice]', () => {
  describe('Проверка обработки экшнов', () => {
    it('Очистка ленты', () => {
      const newState = reducer(feedFullState, clearFeed());
      const { orders } = newState;
      expect(orders).toEqual([]);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение списка недавних заказов', async () => {
      const newState = reducer(initialState, {
        type: fetchFeed.fulfilled.type,
        payload: feedFullState
      });
      const { orders, total, totalToday } = newState;
      expect(orders).toEqual(feedFullState.orders);
      expect(total).toBe(feedFullState.total);
      expect(totalToday).toBe(feedFullState.totalToday);
    });
  });
});
