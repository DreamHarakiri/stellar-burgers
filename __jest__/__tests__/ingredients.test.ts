import { expect, describe } from '@jest/globals';
import {
  initialState,
  reducer
} from '../../src/services/slices/ingredient.slice';
import { getIngredientData } from '../../src/services/asyncFetch/AsyncFetch';
import { ingredientsFullState } from '../test-constaints';

describe('[IngredientsSlice]', () => {
  describe('Проверка асинхронных экшнов', () => {
    it('Получение ингредиентов / Request', () => {
      const newState = reducer(initialState, {
        type: getIngredientData.pending.type
      });
      const { loading } = newState;
      expect(loading).toBe(true);
    });
    it('Получение ингредиентов / Success', () => {
      const newState = reducer(initialState, {
        type: getIngredientData.fulfilled.type,
        payload: ingredientsFullState
      });
      const { ingredients, loading } = newState;
      expect(ingredients).toEqual(ingredientsFullState);
      expect(loading).toBe(false);
    });
    it('Получение ингредиентов / Failed', () => {
      const error = { message: 'Не удалось получить ингредиенты' };
      const newState = reducer(initialState, {
        type: getIngredientData.rejected.type,
        error: error // передаем ошибку через error
      });
      const { loading, error: stateError } = newState;
      expect(loading).toBe(false);
      expect(stateError).toBe(error.message); // 'Не удалось получить ингредиенты'
    });
  });
});
