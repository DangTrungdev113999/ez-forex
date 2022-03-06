/**
 * @format
 */

import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './src/App';
import { name as appName } from './app.json';
import { CHANNEL_ID_NOTIFICATION, CHANNEL_NAME_NOTIFICATION } from './src/common/config';
import { TOPPIC_SIGNAL } from '~/common';
import * as screenTypes from '~/common/screenTypes';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {},
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
    // process the action
    const data = JSON.parse(notification.userInfo);
    if (data?.id && data?.topic === TOPPIC_SIGNAL) {
      navigation.navigate(screenTypes.SignalDetailStack, {
        screen: screenTypes.SignalDetailScreen,
        params: {
          id: data?.id,
        },
      });
    }
  },
  userInteraction: true,
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: CHANNEL_ID_NOTIFICATION,
  channelName: CHANNEL_NAME_NOTIFICATION,
});

AppRegistry.registerComponent(appName, () => App);
