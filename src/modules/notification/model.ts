export type NotificationItemType = {
  content: string;
  createdAt: string;
  icon: string;
  id: number;
  title: string;
  type: string;
};

export type NotificationStateType = {
  notifications: NotificationItemType[];
  fetchNotificationsLoading: boolean;

  isTheFirstOpenNotification: boolean;
};
