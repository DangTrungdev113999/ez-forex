import { useEffect } from 'react';
import { setToken } from '~/common/baseApi';

import { tokenSelector } from '~/modules/auth/selectors';
import { useAppSelector } from '~/hook';
import { useAppDispatch } from './useApp';
import { savaIsTheFirstOpenTabSignal } from '~/modules/signal/slice';
import { saveIsTheFirstOpenHistory } from '~/modules/history/slice';
import { saveIsTheFirstOpenEducation } from '~/modules/education/slice';
import { saveIsTheFirstOpenNotification } from '~/modules/notification/slice';
import { saveIsTheFirstOpenPackage } from '~/modules/package/slice';
import { savaIsTheFirstOpenAlertTab } from '~/modules/alert/slice';

import PushNotification from 'react-native-push-notification';
import { TOPPIC_SIGNAL } from '~/common';
import * as screenTypes from '~/common/screenTypes';
import { CHANNEL_ID_NOTIFICATION, CHANNEL_NAME_NOTIFICATION } from '../common/config';
import { useNavigation } from '@react-navigation/native';

export const useSetup = () => {
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification(notification: any) {
        console.log({ notification });
        const data = notification.data;
        // Press push notification when app Foreground in ios
        if (data?.signalDetailId && data?.topic === TOPPIC_SIGNAL) {
          navigation.navigate(
            screenTypes.SignalDetailStack as never,
            {
              screen: screenTypes.SignalDetailScreen,
              params: {
                id: data?.signalDetailId,
              },
            } as never,
          );
        }
      },
      onAction: function (notification: any) {
        const data = JSON.parse(notification.userInfo);
        // Press push notification when app Foreground in android
        if (data?.signalDetailId && data?.topic === TOPPIC_SIGNAL) {
          navigation.navigate(
            screenTypes.SignalDetailStack as never,
            {
              screen: screenTypes.SignalDetailScreen,
              params: {
                id: data?.signalDetailId,
              },
            } as never,
          );
        }
      },
      // userInteraction: true,
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: CHANNEL_ID_NOTIFICATION,
        channelName: CHANNEL_NAME_NOTIFICATION,
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      setToken('');
      dispatch(savaIsTheFirstOpenTabSignal(true));
      dispatch(saveIsTheFirstOpenHistory(true));
      dispatch(saveIsTheFirstOpenEducation(true));
      dispatch(saveIsTheFirstOpenNotification(true));
      dispatch(saveIsTheFirstOpenPackage(true));
      dispatch(
        savaIsTheFirstOpenAlertTab({
          watchlistTab: true,
          discoverTab: true,
          addWathlistScreen: true,
        }),
      );
    }
  }, [token]);
};
