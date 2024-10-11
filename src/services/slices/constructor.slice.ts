import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

type TConstructor = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | TIngredient | null;
};

const initialState: TConstructor = {
  ingredients: [],
  bun: null
};

export const constructorSlice = createSlice({
  name: 'constructors',
  initialState,
  reducers: {
    addConstructor: (state, { payload: item }) => {
      const newItem = { ...item, id: nanoid() };
      if (newItem.type === 'bun') {
        state.bun = newItem;
        console.log('Булка добавлена');
      } else {
        const { ingredients } = state;

        state.ingredients.push(newItem);
        console.log('не булка добавлена');
      }
    },
    removeConstructor: (state, { payload: item }) => {
      if (item.type !== 'bun') {
        state.ingredients = state.ingredients.filter((i) => i.id !== item.id);
      }
    },
    moveConstructor: (state, { payload: { item, position } }) => {
      const index = state.ingredients.findIndex((i) => i.id === item.id);

      const [movedItem] = state.ingredients.splice(index, 1);
      state.ingredients.splice(index - position, 0, movedItem);
    },
    clearConstructor: () => initialState
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const { reducer } = constructorSlice;

export const { getConstructor } = constructorSlice.selectors;
export const {
  addConstructor,
  removeConstructor,
  moveConstructor,
  clearConstructor
} = constructorSlice.actions;
