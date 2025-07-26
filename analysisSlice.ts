// src/features/analysis/analysisSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface MultiFileResponse {
  metrics: any,
  report: any,
  evaluation: any,
  brief_summary: string
  visualization_json: any
}

interface AnalysisState {
  loading: boolean;
  error: string | null;
  data: MultiFileResponse | null; 
  selectedProduct: string;
  clearCache: boolean;
}

const initialState: AnalysisState = {
  loading: false,
  error: null,
  data: null,
  selectedProduct: 'TM',
  clearCache: false,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setData: (state, action: PayloadAction<any | null>) => {
      state.data = action.payload;
    },
    // updateReport: (state, action: PayloadAction<string>) => {
    //   if (state.data) {
    //     state.data.report = action.payload;
    //   }
    // },
    updateBriefSummary: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.brief_summary = action.payload;
      }
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = action.payload;
    },
    setClearCache: (state, action: PayloadAction<boolean>) => {
      state.clearCache = action.payload;
    },
    
  },
});

export const {
  setLoading,
  setError,
  setData,
  //updateReport,
  updateBriefSummary,
  setSelectedProduct,
  setClearCache,
} = analysisSlice.actions;

export default analysisSlice.reducer;
