import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import PushNotification from 'react-native-push-notification';
import dayjs from 'dayjs';
import {
  CHANNEL_ID_NOTIFICATION,
  CODEPUSH_ANDROID_DEBUG_KEY,
  CODEPUSH_ANDROID_PRODUCTION_KEY,
  CODEPUSH_ANDROID_STAGING_KEY,
  CODEPUSH_IOS_DEBUG_KEY,
  CODEPUSH_IOS_PRODUCTION_KEY,
  CODEPUSH_IOS_STAGING_KEY,
} from '~/common';

type ShowToastErrorType = {
  title?: string;
  message: string;
};

export const formatTimeUnix = ({
  date,
  format = 'HH:mm DD-MM-YYYY',
}: {
  date: number;
  format?: string;
}) => {
  return dayjs.unix(date).format(format);
};

export const formatTime = ({
  date,
  format = 'HH:mm DD-MM-YYYY',
}: {
  date: string;
  format?: string;
}) => {
  return dayjs(date).format(format);
};

export const showToastInfo = ({ title, message }: ShowToastErrorType) => {
  if (message) {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
  }
};

export const showToastError = ({ title, message }: ShowToastErrorType) => {
  if (message) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }
};

export const showToastSuccess = ({ title, message }: ShowToastErrorType) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

export const LocalNotification = ({
  title,
  message,
  signalDetailId,
  topic,
}: {
  title: string;
  message: string;
  signalDetailId: string;
  topic: string;
}) => {
  PushNotification.localNotification({
    title,
    message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    largeIcon: 'ic_launcher',
    channelId: CHANNEL_ID_NOTIFICATION,
    invokeApp: false,
    actions: ['Go to detail'],
    userInfo: {
      signalDetailId,
      topic,
    },
    category: CHANNEL_ID_NOTIFICATION,
  });
};

export function getDeploymentKey() {
  // DEBUG
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return CODEPUSH_ANDROID_DEBUG_KEY;
    }
    return CODEPUSH_IOS_DEBUG_KEY;
  }

  // STAGING
  if (Config.ENV === 'staging') {
    if (Platform.OS === 'android') {
      return CODEPUSH_ANDROID_STAGING_KEY;
    }
    return CODEPUSH_IOS_STAGING_KEY;
  }

  // PRODUCTION
  if (Platform.OS === 'android') {
    return CODEPUSH_ANDROID_PRODUCTION_KEY;
  }
  return CODEPUSH_IOS_PRODUCTION_KEY;
}

export const isAndroid = Platform.OS === 'android';
