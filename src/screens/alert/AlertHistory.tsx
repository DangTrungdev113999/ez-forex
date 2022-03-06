import React, { useState } from 'react';
import {
  Block,
  Body,
  Button,
  Text,
  Touchable,
  IconSvg,
  List,
  ConfirmDeleteModal,
  AddBtn,
} from '~/components';
import { NoData } from '~/components/noData';
import * as screenTypes from '~/common/screenTypes';

import { useNavigationSetOption, useHandleFetchData, useAppSelector } from '~/hook';
import SvgDefault from '~/assets/svg';
import { useRoute } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import AlertHistoryItem from './components/AlertHistoryItem';
import { fetchAlertsHistory } from '~/modules/alert/slice';
import { alertsHistorySelector } from '~/modules/alert/selectors';

function AlertHistoryScreen() {
  const alertsHistory = useAppSelector(alertsHistorySelector);

  const route = useRoute();

  const { alert, pairs } = route.params;

  const { onHandleFetchData, refreshLoading } = useHandleFetchData(
    {
      actionToDispatch: fetchAlertsHistory,
      params: {
        pairId: pairs?.id,
        timeFrameId: alert?.subscribeDetail?.timeFrameId,
        methodId: alert?.subscribeDetail?.methodId,
      },
    },
    [],
  );

  useNavigationSetOption(
    {
      title: alert.name,
    },
    [alert],
  );

  const timeFrame = alert?.timeFrame;

  return (
    <Body ph={24}>
      {!Object.keys(alertsHistory).length && <NoData mt={150} />}

      <List
        data={Object.keys(alertsHistory)}
        renderItem={({ item }) => (
          <>
            <Text mt={24} fontWeight='semiBold' type='c1' color={ColorsDefault.textGrayDark}>
              {item}
            </Text>

            <List
              data={alertsHistory[item]}
              renderItem={({ item }) => (
                <AlertHistoryItem alert={item} pairs={pairs} timeFrame={timeFrame} />
              )}
            />
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Body>
  );
}

export default AlertHistoryScreen;
