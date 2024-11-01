import { expect, describe, it, afterAll, jest } from '@jest/globals';
import {
  addConstructor,
  removeConstructor,
  moveConstructor,
  clearConstructor,
  reducer
} from '../../src/services/slices/constructor.slice';
import {
  burgerAfterDeleteState,
  burgerAfterReorderState,
  burgerFullState,
  newBun,
  newIngredient
} from '../test-constaints';

// Мок для nanoid
jest.mock('nanoid');

describe('[burgerConstructorSlice]', () => {
  describe('Проверка обработки экшнов', () => {
    it('Добавление ингредиента в конструктор', () => {
      const newState = reducer(burgerFullState, addConstructor(newIngredient));
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        ...burgerFullState.ingredients,
        { ...newIngredient, id: '0000-0000-0000-0000' }
      ]);
    });

    it('Изменение булки', () => {
      const newState = reducer(burgerFullState, addConstructor(newBun));
      const { bun } = newState;
      expect(bun).toEqual({ ...newBun, id: '0000-0000-0000-0000' });
    });

    it('Удаление ингредиента из конструктора', () => {
      const newState = reducer(
        burgerFullState,
        removeConstructor({ id: '0b5b267b-b544-45ba-9817-e3cb1ef5b372' })
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(burgerAfterDeleteState);
    });

    it('Изменение порядка ингредиентов в начинке', () => {
      const newState = reducer(
        burgerFullState,
        moveConstructor({
          item: { id: '04124f1f-87af-485e-aae5-a58b024aaba1' },
          position: 1
        })
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(burgerAfterReorderState);
    });

    it('Очистка конструктора', () => {
      const newState = reducer(burgerFullState, clearConstructor());
      expect(newState).toEqual({ bun: null, ingredients: [] });
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
