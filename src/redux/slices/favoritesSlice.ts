import { createSlice } from '@reduxjs/toolkit';
import { Datum } from '@utils/interface/artworks.interface';
import { RootState } from '@redux/store';

const initialState: { favorites: Datum[] } = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { artwork } = action.payload;
      if (!state.favorites.some((item: Datum) => item.id === artwork.id)) {
        state.favorites.push(artwork);
      }
    },
    removeFromFavorites: (state, action) => {
      const { artworkId } = action.payload;
      state.favorites = state.favorites.filter((artwork: Datum) => artwork.id !== artworkId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const allFavorites = (state: RootState) => state.favorites.favorites;
export default favoritesSlice.reducer;
