import { combineReducers } from 'redux';
import favoritesReducer from '@redux/slices/favoritesSlice';
import artworksSlice from '@redux/slices/artworksSlice';

export default combineReducers({
  favorites: favoritesReducer,
  artworks: artworksSlice,
});
