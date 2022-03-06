import * as React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigation } from '@react-navigation/native';
import {
  Block,
  Body,
  CommonSkeleton,
  IconSvg,
  List,
  MyRefreshControl,
  Text,
  Touchable,
} from '~/components';

import SvgDefault from '~/assets/svg';
import ColorsDefault from '~/assets/colors';

import * as screenTypes from '~/common/screenTypes';
import { useAppSelector, useHandleFetchData } from '~/hook';
import { fetchNotifications } from '~/modules/notification/slice';
import {
  isTheFirstOpenNotificationSelecter,
  notificationsSelector,
} from '~/modules/notification/selectors';
import { NotificationItemType } from '~/modules/notification/model';

dayjs.extend(relativeTime);

function NotificationScreen() {
  const navigation = useNavigation();

  const notifications = useAppSelector(notificationsSelector);
  const isTheFirstOpenNotification = useAppSelector(isTheFirstOpenNotificationSelecter);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchNotifications,
  });

  const onGotoNotificationDetail = (nottificationItem: NotificationItemType) => {
    navigation.navigate(
      screenTypes.NoticationDetailScreen as never,
      {
        nottificationItem,
      } as never,
    );
  };

  const renderItem = ({ item }: { item: NotificationItemType }) => (
    <Touchable row middle ph={24} pv={8} onPress={() => onGotoNotificationDetail(item)}>
      <IconSvg
        xml={item?.type === 'admin' ? SvgDefault.notificationUpdate : SvgDefault.notificatioVideo}
      />
      <Block ml={16} flex={1}>
        <Text type='c1'>{item?.title}</Text>
        <Text mt={3} type='c2' color={ColorsDefault.textGrayDark}>
          {dayjs(item?.createdAt).toNow(true)} ago
        </Text>
      </Block>
    </Touchable>
  );

  return (
    <Body>
      {isTheFirstOpenNotification && <CommonSkeleton />}

      {!isTheFirstOpenNotification && (
        <List
          mt={12}
          data={notifications}
          renderItem={renderItem}
          refreshControl={
            !isTheFirstOpenNotification && (
              <MyRefreshControl
                refreshing={refreshLoading}
                onRefresh={() => onHandleFetchData(true)}
              />
            )
          }
        />
      )}
    </Body>
  );
}

export default NotificationScreen;
