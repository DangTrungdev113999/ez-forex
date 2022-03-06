import React, { useState } from 'react';
import { Block, Text, Touchable, IconSvg, Radio, ToggleNotificationModal } from '~/components';
import messaging from '@react-native-firebase/messaging';
import { NoData } from '~/components/noData';
import * as screenTypes from '~/common/screenTypes';

import SvgDefault from '~/assets/svg';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import { formatTime } from '~/utils';
import { useAppDispatch } from '~/hook';
import { toggleNotification } from '~/modules/alert/slice';

type PropsType = {
  updateMode: boolean;
  pairs: any;
  alert: any;
  checked: boolean;
  onHandleListPicked: any;
};

function AlertChannelItem({ updateMode, pairs, alert, checked, onHandleListPicked }: PropsType) {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const goToSubAlert = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.SubAlertScreen,
        params: {
          pairs: alert,
          discoverItem: {
            id: alert?.subscribeDetail?.methodId,
          },
          updateAlert: true,
          headerTitle: alert.name,
        },
      } as never,
    );
  };

  const goToAlertHistory = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.AlertHistoryScreen,
        params: {
          alert,
          pairs,
        },
      } as never,
    );
  };

  const onCloseModal = () => setVisible(false);
  const onOpenModal = () => setVisible(true);
  const onHandleToggleSubAlert = () => {
    let isActive = alert.isActive;
    dispatch(
      toggleNotification({
        data: {
          alertId: alert.id,
          isActive: alert.isActive ? false : true,
        },
        onSuccess: () => {
          onCloseModal();
          if (isActive) {
            messaging()
              .unsubscribeFromTopic(alert?.topic || '')
              .then(() => console.log(`Un Subscribed to topic! ${alert?.topic}`));
          } else {
            messaging()
              .subscribeToTopic(alert?.topic || '')
              .then(() => console.log(`Subscribed to topic! ${alert?.topic}`));
          }
        },
        onError: () => {
          onCloseModal();
        },
      }),
    );
  };

  return (
    <Touchable
      mt={12}
      width='100%'
      p={14}
      borderRadius={12}
      shadow
      bg={ColorsDefault.bgPrimary}
      onPress={goToAlertHistory}>
      <Block row justifyBetween>
        <Touchable row middle onPress={goToSubAlert}>
          <IconSvg xml={SvgDefault.setting} />
          <Text ml={6} type='c1' fontWeight='medium'>
            {alert?.name || ''}
          </Text>
        </Touchable>

        <Block row>
          <IconSvg
            touchable
            xml={alert.isActive ? SvgDefault.notifOn : SvgDefault.notifOf}
            hitSlop={{ top: 10, bottom: 10, left: 20, right: 5 }}
            onPress={onOpenModal}
          />
          <IconSvg
            touchable
            ml={20}
            xml={SvgDefault.edit}
            hitSlop={{ top: 10, bottom: 10, left: 5, right: 20 }}
            onPress={goToSubAlert}
          />
        </Block>
      </Block>
      {alert.createdAt && (
        <Block mt={12} p={10} borderRadius={8} bg={ColorsDefault.bgBody}>
          <Block row middle justifyBetween>
            <Block row>
              <IconSvg xml={SvgDefault.bearUp} />
              <Text
                ml={6}
                type='c1'
                fontWeight='semiBold'
                color={
                  alert?.signalType === 'Bullish signal' ? ColorsDefault.green : ColorsDefault.red
                }>
                {alert?.signalType || ''}
              </Text>
              <Text type='c1' color={ColorsDefault.grayDark}>
                {' '}
                ({alert?.timeFrame || ''})
              </Text>
            </Block>

            <Text type='c2' color={ColorsDefault.grayDark}>
              {formatTime({
                date: alert.createdAt,
              })}
            </Text>
          </Block>

          <Block mt={10} row>
            <IconSvg xml={SvgDefault.ratingSquare} />
            <Text ml={6} type='c1' color={ColorsDefault.grayDark}>
              {alert?.condition || ''}
            </Text>
          </Block>

          <Block mt={10} row>
            <IconSvg xml={SvgDefault.requestPage} />
            <Text ml={6} type='c1' color={ColorsDefault.grayDark}>
              {pairs?.pairs || ''} :{' '}
            </Text>
            <Text type='c1' fontWeight='semiBold'>
              {alert?.prices || ''}
            </Text>
          </Block>
        </Block>
      )}
      {!alert.createdAt && (
        <Block mt={12} p={10} borderRadius={8} bg={ColorsDefault.bgBody}>
          <NoData
            iconWidth={217}
            iconHeight={47}
            content={
              <Text mt={10} type='c2' color={ColorsDefault.grayDark}>
                No alert history
              </Text>
            }
          />
        </Block>
      )}
      {updateMode && (
        <Block absolute bottom={8} right={8}>
          <Radio
            checked={checked}
            onPress={() => onHandleListPicked(alert)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          />
        </Block>
      )}

      <ToggleNotificationModal
        visible={visible}
        onCloseModal={onCloseModal}
        onHandleToggle={onHandleToggleSubAlert}
        title={alert?.isActive ? 'STOP THIS ALERT' : 'START THIS ALERT'}
        content={
          alert?.isActive
            ? 'Are you sure to stop this alert signals?'
            : 'Are you sure to start this alert signals?'
        }
        icon={alert?.isActive ? SvgDefault.notifOf1 : SvgDefault.notifiOn1}
      />
    </Touchable>
  );
}

export default AlertChannelItem;
