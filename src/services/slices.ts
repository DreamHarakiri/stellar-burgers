import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from './store';

export type TLoadIngredients = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
  favorite: Array<TIngredient>;
};

const initialState: TLoadIngredients = {
  ingredients: [],
  loading: false,
  error: null,
  favorite: []
};

export const getIngredientData = createAsyncThunk(
  'ingredients/getIngredientData',
  async () => {
    const response = await getIngredientsApi();

    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addToCard: (state, { payload: item }) => {
      if (item) {
        state.favorite.push(item);
      } else {
        console.log('item is undefined or null');
      }
    }
  },
  selectors: {
    getIngredientBuns: (state: TLoadIngredients) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getIngredientMains: (state: TLoadIngredients) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getIngredientSauces: (state: TLoadIngredients) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    getCard: (state: TLoadIngredients) => state,
    getState: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      })
      .addCase(getIngredientData.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { reducer } = ingredientsSlice;
export const {
  getIngredientBuns,
  getIngredientMains,
  getIngredientSauces,
  getCard,
  getState
} = ingredientsSlice.selectors;
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectLoading = (state: RootState) => state.ingredients.loading;
export const selectError = (state: RootState) => state.ingredients.error;
export const { addToCard } = ingredientsSlice.actions;
