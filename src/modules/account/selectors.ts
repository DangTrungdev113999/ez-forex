import { createSelector } from 'reselect';

const accountSelector = state => state.account;

export const userInfoSelector = createSelector(accountSelector, account => account.userInfo);

export const fetchUserInfoLoadingSelector = createSelector(
  accountSelector,
  account => account.fetchUserInfoLoading,
);

export const updateUserInfoLoadingSelector = createSelector(
  accountSelector,
  account => account.updateUserInfoLoading,
);

export const changePasswordLoadingSelector = createSelector(
  accountSelector,
  account => account.changePasswordLoading,
);

export const countriesSelector = createSelector(
  accountSelector,
  (_, keyword: string) => keyword,
  (account, keyword) => {
    if (!keyword) {
      return account?.countries;
    }

    return account?.countries?.filter(item =>
      item.toLocaleUpperCase().includes(keyword.toLocaleUpperCase()),
    );
  },
);
