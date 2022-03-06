import { createSelector } from 'reselect';

const historySelector = state => state.history;

export const historiesSelector = createSelector(historySelector, history => history.histories);

export const fetchHistoriesLoadingSelector = createSelector(
  historySelector,
  history => history.fetchHistoriesLoading,
);

export const isTheFirstOpenHistorySelecter = createSelector(
  historySelector,
  history => history.isTheFirstOpenHistory,
);
