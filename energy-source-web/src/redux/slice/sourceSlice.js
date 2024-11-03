import { createSlice } from '@reduxjs/toolkit';
import { addSource, deleteSource, getSourceList, updateSource } from '../api/sourceApi';

const initialState = {
  sources: [],
  loading: false,
  error: null,
};

const sourceSlice = createSlice({
  name: 'source',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSourceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSourceList.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
      })
      .addCase(getSourceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSource.fulfilled, (state, action) => {
        state.loading = false;
        state.sources.push(action.payload);
      })
      .addCase(addSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSource.fulfilled, (state, action) => {
        state.sources = state.sources.map((source) =>
          source.sourcesId === action.meta.arg.id ? action.payload : source
        );
      })
      .addCase(deleteSource.fulfilled, (state, action) => {
        state.sources = state.sources.filter((source) => source.sourcesId !== action.meta.arg);
      });
  },
});

export default sourceSlice.reducer;
