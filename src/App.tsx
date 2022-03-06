import React, { Suspense, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import codePush from 'react-native-code-push';

import { store, persistor } from './redux/configStore';
import Navigation from '~/navigation';
import { getDeploymentKey } from './utils';

const App = () => {
  useEffect(() => {
    codePush.sync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<View />}>
          <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
          <Navigation />
          <Toast ref={ref => Toast.setRef(ref)} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default codePush({
  deploymentKey: getDeploymentKey(),
  // updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);
