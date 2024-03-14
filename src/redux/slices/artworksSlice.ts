import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { artworksSliceInit } from '@utils/interface/artworks.interface';
import { successGenericAdapter } from '@api/adapters/generic.adapter';
import { getArtData } from '@api/service';

const initialState: artworksSliceInit = {
  data: [],
  pagination: {
    current_page: 0,
    limit: 0,
    next_url: '',
    offset: 0,
    total: 0,
    total_pages: 0,
  },
  error: '',
  isFetching: true,
  status: '',
};

export const gettingArtwork = createAsyncThunk('artwork/gettingArtwork', async (_, { getState, rejectWithValue }) => {
  try {
    const {
      artworks: {
        pagination: { current_page },
      },
    } = getState() as { artworks: artworksSliceInit };
    const response = await getArtData(current_page);
    const responseAdapter = successGenericAdapter(response);

    if (responseAdapter.data && responseAdapter.status !== 400) {
      return responseAdapter;
    } else {
      return rejectWithValue({
        error: responseAdapter.detail,
        code: '0',
      });
    }
  } catch (e: unknown) {
    const errorCatch = e as Error;
    const newError = errorCatch.message || errorCatch || '';
    return rejectWithValue({ error: newError, code: '0' });
  }
});

const artworkSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gettingArtwork.pending, (state) => {
        return {
          ...state,
          error: '',
          isFetching: true,
          status: 'FETCHING',
        };
      })
      .addCase(gettingArtwork.fulfilled, (state, action) => {
        return {
          ...state,
          data: [...state.data, ...action.payload.data],
          pagination: action.payload.pagination,
          error: '',
          isFetching: false,
          status: 'SUCCESS',
        };
      })
      .addCase(gettingArtwork.rejected, (state, action) => {
        const { error } = action.payload as { error: string; code: string };
        return {
          ...state,
          error,
          isFetching: false,
          status: 'ERROR',
        };
      });
  },
});

export const artworksResponse = (state: RootState) => state.artworks.data;
export const artworksState = (state: RootState) => state.artworks;
export default artworkSlice.reducer;
