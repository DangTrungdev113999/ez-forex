/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { HistoryStateType } from './model';

const initialState: HistoryStateType = {
  histories: {},
  fetchHistoriesLoading: false,

  isTheFirstOpenHistory: true,
};

const Historieslice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    fetchHistories: (state, action) => {
      state.fetchHistoriesLoading = true;
    },
    fetchHistoriesSucceeded: (state, action) => {
      state.fetchHistoriesLoading = false;
      state.histories = action.payload?.content || {};
    },
    fetchHistoriesError: (state, action) => {
      state.fetchHistoriesLoading = false;
    },

    saveIsTheFirstOpenHistory: (state, action) => {
      state.isTheFirstOpenHistory = false;
    },
  },
});

const { actions, reducer } = Historieslice;

export const {
  fetchHistories,
  fetchHistoriesSucceeded,
  fetchHistoriesError,
  saveIsTheFirstOpenHistory,
} = actions;

export default reducer;
