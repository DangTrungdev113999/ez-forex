import React, { useState } from 'react';
import { Block, Text, Touchable, IconSvg, Radio, ToggleNotificationModal } from '~/components';
import { NoData } from '~/components/noData';
import * as screenTypes from '~/common/screenTypes';

import SvgDefault from '~/assets/svg';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import { formatTime } from '~/utils';

type PropsType = {
  alert: any;
  pairs: any;
  timeFrame: string;
};

function AlertHistoryItem({ alert, pairs, timeFrame }: PropsType) {
  return (
    <Block mt={12} p={10} borderRadius={8} bg={ColorsDefault.bgPrimary}>
      <Block row middle justifyBetween>
        <Block row>
          <IconSvg xml={SvgDefault.bearUp} />
          <Text
            ml={6}
            type='c1'
            fontWeight='semiBold'
            color={
              alert?.conditionType === 'Bullish signal' ? ColorsDefault.green : ColorsDefault.red
            }>
            {alert?.conditionType || ''}
          </Text>
          <Text type='c1' color={ColorsDefault.grayDark}>
            {' '}
            ({timeFrame || ''})
          </Text>
        </Block>

        <Text type='c2' color={ColorsDefault.grayDark}>
          {formatTime({
            date: alert.createdAt,
            format: 'HH:mm',
          })}
        </Text>
      </Block>

      <Block mt={10} row>
        <IconSvg xml={SvgDefault.ratingSquare} />
        <Text ml={6} type='c1' color={ColorsDefault.grayDark}>
          {alert?.conditionName || ''}
        </Text>
      </Block>

      <Block mt={10} row>
        <IconSvg xml={SvgDefault.requestPage} />
        <Text ml={6} type='c1' color={ColorsDefault.grayDark}>
          {pairs?.pairs || ''}:{' '}
        </Text>
        <Text type='c1' fontWeight='semiBold'>
          {alert?.price || ''}
        </Text>
      </Block>
    </Block>
  );
}

export default AlertHistoryItem;
