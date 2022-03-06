import { createSelector } from 'reselect';

const notificationSelector = state => state.notification;

export const notificationsSelector = createSelector(
  notificationSelector,
  notification => notification.notifications,
);

export const fetchMotificationsLoadingSelector = createSelector(
  notificationSelector,
  notification => notification.fetchNotificationsLoading,
);

export const isTheFirstOpenNotificationSelecter = createSelector(
  notificationSelector,
  notification => notification.isTheFirstOpenNotification,
);
