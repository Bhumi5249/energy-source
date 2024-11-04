import { createSlice } from '@reduxjs/toolkit';
import { addProduction, getProductionList, getProductionListByRange, updateProduction } from '../api/productionApi';

const initialState = {
  productions: [],
  productionsByRange: [],
  loading: false,
  error: null,
};

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductionList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductionList.fulfilled, (state, action) => {
        state.loading = false;
        state.productions = action.payload;
      })
      .addCase(getProductionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductionListByRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductionListByRange.fulfilled, (state, action) => {
        state.loading = false;
        state.productionsByRange = action.payload;
      })
      .addCase(getProductionListByRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.productions.push(action.payload);
      })
      .addCase(addProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduction.fulfilled, (state, action) => {
        state.productions = state.productions.map((prod) =>
            prod.productionId === action.meta.arg.id ? action.payload : prod
        );
      })
  },
});

export default productionSlice.reducer;
