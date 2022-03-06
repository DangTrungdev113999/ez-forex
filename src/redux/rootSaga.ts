import { all } from 'redux-saga/effects';
import authSaga from '~/modules/auth/saga';
import alertSaga from '~/modules/alert/saga';
import signalSaga from '~/modules/signal/saga';
import historySaga from '~/modules/history/saga';
import packageSaga from '~/modules/package/saga';
import notificationSaga from '~/modules/notification/saga';
import educationSaga from '~/modules/education/saga';
import accountSaga from '~/modules/account/saga';

function* rootSaga() {
  yield all([
    authSaga(),
    alertSaga(),
    signalSaga(),
    historySaga(),
    accountSaga(),
    packageSaga(),
    notificationSaga(),
    educationSaga(),
  ]);
}
export default rootSaga;
