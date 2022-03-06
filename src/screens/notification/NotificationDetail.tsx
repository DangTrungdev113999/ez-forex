import * as React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Block, Body, Text } from '~/components';
import ColorsDefault from '~/assets/colors';
import { NotificationItemType } from '~/modules/notification/model';

dayjs.extend(relativeTime);

type ParamList = {
  Detail: {
    nottificationItem: NotificationItemType;
  };
};

function NotificationDetailScreen() {
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const { nottificationItem } = route.params;

  console.log({ route });
  return (
    <Body ph={24}>
      <Block mt={24} p={16} bg={ColorsDefault.bgPrimary} borderRadius={20}>
        <Text>{nottificationItem?.title}</Text>
        <Text type='c1' mt={10}>
          {nottificationItem?.content}
        </Text>
      </Block>
      <Text mt={12} textRight type='c2' color={ColorsDefault.textGrayDark}>
        {dayjs(nottificationItem?.createdAt).toNow(true)} ago
      </Text>
    </Body>
  );
}

export default NotificationDetailScreen;
