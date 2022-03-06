/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { saveFirebaseToken } from '~/modules/auth/slice';

export const useGetFirebaseToken = () => {
  const dispatch = useDispatch();

  const syncFCMToken = async () => {
    const enabled = await messaging().hasPermission();

    setTimeout(async () => {
      if (enabled < 0) {
        try {
          await messaging().requestPermission();
        } catch (error) {
          console.log(error);
        }
      }

      messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            dispatch(saveFirebaseToken(fcmToken));
          }
        })
        .catch(e => {
          console.log('getToken', e);
        });
    }, 500);
  };

  useEffect(() => {
    syncFCMToken();
  }, []);
};
