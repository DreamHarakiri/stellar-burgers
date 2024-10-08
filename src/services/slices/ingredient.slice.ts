import { createSlice } from '@reduxjs/toolkit';
import { getIngredientData } from '../asyncFetch/AsyncFetch';
import { TIngredient } from '@utils-types';

export type TLoadIngredients = {
  ingredients: TIngredient[];
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

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addToCard: (state, { payload: item }) => {
      if (item) {
        state.favorite.push(item);
      } else {
        console.log('item is undefined or nul');
      }
    }
  },
  selectors: {
    getAllIngredients: (state) => state.ingredients
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
export const { getAllIngredients } = ingredientsSlice.selectors;

export const { addToCard } = ingredientsSlice.actions;
