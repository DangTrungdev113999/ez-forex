/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SignalStateType } from './model';

const initialState: SignalStateType = {
  signals: {},
  fetchSignalsLoading: false,

  isTheFirstOpenTabSignal: true,
};

const signalSlice = createSlice({
  name: 'signal',
  initialState,
  reducers: {
    fetchSignals: (state, action) => {
      state.fetchSignalsLoading = true;
    },
    fetchSignalsSucceeded: (state, action) => {
      state.fetchSignalsLoading = false;
      state.signals = action.payload?.content;
    },
    fetchSignalsError: (state, action) => {
      state.fetchSignalsLoading = false;
    },

    savaIsTheFirstOpenTabSignal: (state, action) => {
      state.isTheFirstOpenTabSignal = action.payload;
    },
  },
});

const { actions, reducer } = signalSlice;

export const {
  fetchSignals,
  fetchSignalsSucceeded,
  fetchSignalsError,
  savaIsTheFirstOpenTabSignal,
} = actions;

export default reducer;
