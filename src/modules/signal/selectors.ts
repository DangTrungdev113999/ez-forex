import { createSelector } from 'reselect';

const signalSelector = state => state.signal;

export const signalsSelector = createSelector(signalSelector, signal => signal.signals);

export const fetchSignalsLoadingSelector = createSelector(
  signalSelector,
  signal => signal.fetchSignalsLoading,
);

export const isTheFirstOpenTabSignalSelector = createSelector(
  signalSelector,
  signal => signal.isTheFirstOpenTabSignal,
);
