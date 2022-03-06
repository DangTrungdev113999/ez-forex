import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Block, Text, IconSvg, Touchable } from '~/components';

import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { useAppSelector } from '~/hook';
import { allMethodSelector, allTimeFrameSelector } from '~/modules/alert/selectors';

type PropsType = {
  updateMode: boolean;
  setUpdateMode: any;
  timeFramePicked: string;
  setTimeFrame: any;
  methodPicked: string;
  setMethod: any;
};

const MAP_METHOD = {
  All: 'All',
  MOMENTUM: 'Momentum',
  PRICE_ACTION: 'Price Action',
  TRENDING_FOLLOWING: 'Trending Following',
  VOLATILITY: 'Volatility',
  STRATEGY: 'Strategy',
};

function BottomTab({
  updateMode,
  setUpdateMode,
  timeFramePicked,
  setTimeFrame,
  methodPicked,
  setMethod,
}: PropsType) {
  const [showFilter, setShowFilter] = useState(false);
  const [showAlertTime, setShowAlertTime] = useState(false);

  const allTimeFrame = useAppSelector(allTimeFrameSelector);
  const allMethod = useAppSelector(allMethodSelector);

  const insets = useSafeAreaInsets();

  const onToggleUpdateMode = () => {
    setUpdateMode(!updateMode);
  };

  const onHandleSetTimeFrame = (time: string) => {
    setTimeFrame(time);
    setShowAlertTime(false);
  };

  const onHandleSetMethod = (method: string) => {
    setMethod(method);
    setShowFilter(false);
  };

  const _renderFilter = () => (
    <Touchable bg={ColorsDefault.bgPrimary} borderRadius={5} shadow>
      <Touchable
        p={10}
        width={134}
        center
        middle
        borderBottom
        onPress={() => onHandleSetMethod('All')}>
        <Text
          type='c1'
          color={MAP_METHOD[methodPicked] === 'All' ? ColorsDefault.green : ColorsDefault.white}>
          All
        </Text>
      </Touchable>
      {allMethod.map(method => (
        <Touchable
          p={10}
          width={134}
          center
          middle
          borderBottom
          onPress={() => onHandleSetMethod(method)}>
          <Text
            type='c1'
            color={
              MAP_METHOD[methodPicked] === MAP_METHOD[method]
                ? ColorsDefault.green
                : ColorsDefault.white
            }>
            {MAP_METHOD[method]}
          </Text>
        </Touchable>
      ))}
    </Touchable>
  );

  const _renderAlerttime = () => (
    <Block width={223} height={86} row wrap bg={ColorsDefault.bgPrimary} borderRadius={5} shadow>
      <Touchable
        ph={20}
        pv={14}
        center
        middle
        borderWidth={0.6}
        borderColor={'#252935'}
        onPress={() => onHandleSetTimeFrame('All')}>
        <Text
          type='c1'
          color={timeFramePicked === 'All' ? ColorsDefault.green : ColorsDefault.white}>
          All
        </Text>
      </Touchable>

      {allTimeFrame.map(time => (
        <Touchable
          ph={20}
          pv={14}
          center
          middle
          borderWidth={0.6}
          borderColor={'#252935'}
          onPress={() => onHandleSetTimeFrame(time)}>
          <Text
            type='c1'
            color={timeFramePicked === time ? ColorsDefault.green : ColorsDefault.white}>
            {time}
          </Text>
        </Touchable>
      ))}
    </Block>
  );

  return (
    <Block
      height={66}
      row
      justifyBetween
      shadow
      absolute
      bottom={0}
      left={0}
      right={0}
      bg={ColorsDefault.bgPrimary}>
      <Touchable flex={1} center middle onPress={() => setShowAlertTime(!showAlertTime)}>
        <Tooltip
          isVisible={showAlertTime}
          content={_renderAlerttime()}
          placement='top'
          contentStyle={{
            backgroundColor: ColorsDefault.bgPrimary,
          }}
          topAdjustment={Platform.OS === 'android' ? -insets.top : 0}
          onClose={() => setShowAlertTime(false)}>
          <Touchable flex={1} center middle onPress={() => setShowAlertTime(!showAlertTime)}>
            <IconSvg xml={SvgDefault.alertTab} />
            <Text mt={4} type='c2' fontWeight='medium' color={ColorsDefault.grayDark}>
              {timeFramePicked}
            </Text>
          </Touchable>
        </Tooltip>
      </Touchable>

      <Touchable flex={1} center middle onPress={() => setShowFilter(!showFilter)}>
        <Tooltip
          isVisible={showFilter}
          content={_renderFilter()}
          placement='top'
          contentStyle={{
            backgroundColor: ColorsDefault.bgPrimary,
          }}
          topAdjustment={Platform.OS === 'android' ? -insets.top : 0}
          onClose={() => setShowFilter(false)}>
          <Touchable flex={1} center middle onPress={() => setShowFilter(!showFilter)}>
            <IconSvg xml={SvgDefault.filter} />
            <Text mt={4} type='c2' fontWeight='medium' color={ColorsDefault.grayDark}>
              {MAP_METHOD[methodPicked]}
            </Text>
          </Touchable>
        </Tooltip>
      </Touchable>

      <Touchable flex={1} center middle onPress={onToggleUpdateMode}>
        <IconSvg xml={SvgDefault.setting2} />
        <Text mt={4} type='c2' fontWeight='medium' color={ColorsDefault.grayDark}>
          Edit
        </Text>
      </Touchable>
    </Block>
  );
}

export default BottomTab;
