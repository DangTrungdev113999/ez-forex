/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { LocalNotification } from '~/utils';
import { TOPPIC_SIGNAL, TOPPIC_SYSNOTI } from '~/common';
import { updateNumberNotiApi } from '~/modules/notification/apis';
import { useNavigation } from '@react-navigation/native';
import * as screenTypes from '~/common/screenTypes';

export const usePushNotification = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onUpdateNotification = async remoteMessage => {
    if (remoteMessage?.data?.topic === TOPPIC_SIGNAL && !loading) {
      setLoading(true);
      try {
        const result: any = await updateNumberNotiApi();
        setLoading(false);
        if (!result.data) {
          // TODO un comment
          // messaging()
          //   .unsubscribeFromTopic(TOPPIC_SIGNAL)
          //   .then(() => console.log('Un Subscribed to topic TOPPIC_SIGNAL!'));
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleClickNotificationOnOutApp = remoteMessage => {
    console.log({ remoteMessage });
    if (remoteMessage.data?.id && remoteMessage?.data?.topic === TOPPIC_SIGNAL) {
      navigation.navigate(
        screenTypes.SignalDetailStack as never,
        {
          screen: screenTypes.SignalDetailScreen,
          params: {
            id: remoteMessage.data?.id,
          },
        } as never,
      );
    }
  };

  useEffect(() => {
    messaging()
      .subscribeToTopic(TOPPIC_SYSNOTI)
      .then(() => console.log('Subscribed to topic TOPPIC_SYSNOTI!'));

    // TODO remove
    messaging()
      .subscribeToTopic(TOPPIC_SIGNAL)
      .then(() => console.log('Subscribed to topic TOPPIC_SIGNAL!'));

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      onUpdateNotification(remoteMessage);
    });

    messaging().onMessage(remoteMessage => {
      onUpdateNotification(remoteMessage);
      LocalNotification({
        title: remoteMessage.notification?.title as string,
        message: remoteMessage.notification?.body as string,
        signalDetailId: remoteMessage.data?.id as string,
        topic: remoteMessage?.data?.topic as string,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        handleClickNotificationOnOutApp(remoteMessage);
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      handleClickNotificationOnOutApp(remoteMessage);
    });
  }, []);
};
