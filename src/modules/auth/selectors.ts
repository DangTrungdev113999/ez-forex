import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const tokenSelector = createSelector(authSelector, auth => auth.token);

export const logInLoadingSelector = createSelector(
  authSelector,
  auth => auth?.logInWithEmailLoading,
);

export const firebaseTokenSelector = createSelector(authSelector, auth => auth.firebaseToken);

export const signUpLoadingSelector = createSelector(authSelector, auth => auth.signUpLoading);
