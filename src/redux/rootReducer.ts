import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

import auth from '~/modules/auth/slice';
import signal from '~/modules/signal/slice';
import alert from '~/modules/alert/slice';
import account from '~/modules/account/slice';
import history from '~/modules/history/slice';
import _package from '~/modules/package/slice';
import education from '~/modules/education/slice';
import notification from '~/modules/notification/slice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'firebaseToken'],
};

const accountPersistConfig = {
  key: 'account',
  storage: AsyncStorage,
  whitelist: ['userInfo'],
};

const alertPersistConfig = {
  key: 'alert',
  storage: AsyncStorage,
  whitelist: ['discoverAlertType'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  signal,
  alert: persistReducer(alertPersistConfig, alert),
  account: persistReducer(accountPersistConfig, account),
  history,
  _package,
  education,
  notification,
});

export default rootReducer;
