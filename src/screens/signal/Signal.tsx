/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import ColorsDefault from '~/assets/colors';
import { Body, List, MyRefreshControl, Text, Search, Block, AddBtn } from '~/components';

import {
  useAppDispatch,
  useAppSelector,
  useHandleFetchData,
  useSetup,
  usePushNotification,
  useIAP,
} from '~/hook';
import { fetchUserInfo } from '~/modules/account/slice';
import { fetchSignals } from '~/modules/signal/slice';

import SignalItem from './components/SignalItem';
import { isTheFirstOpenTabSignalSelector, signalsSelector } from '~/modules/signal/selectors';
import { SignalItemType } from '~/modules/signal/model';
import SignalTabSkeleton from '~/components/skeleton/SignalTabSkeleton';
import { Animated } from 'react-native';
import { NoData } from '~/components/noData';

const HEIGHT_ITEM = 115;

function SignalScreen() {
  const [searchText, setTxt] = useState('');

  const dispatch = useAppDispatch();

  const signals = useAppSelector(signalsSelector);

  const isTheFirstOpenTabSignal = useAppSelector(isTheFirstOpenTabSignalSelector);

  const scrollY = useRef(new Animated.Value(0)).current;

  useSetup();

  usePushNotification();

  useIAP();

  useEffect(() => {
    dispatch(fetchUserInfo({}));
  }, []);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchSignals,
  });

  const renderItem = ({ item, index, totalItemPrevies }) => {
    const scaleInputRange = [
      -1,
      0,
      HEIGHT_ITEM * (index + totalItemPrevies),
      HEIGHT_ITEM * (index + totalItemPrevies + 2),
    ];

    const opacityInputRange = [
      -1,
      0,
      HEIGHT_ITEM * (index + totalItemPrevies),
      HEIGHT_ITEM * (index + totalItemPrevies + 1),
    ];

    const scale = scrollY.interpolate({
      inputRange: scaleInputRange,
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Block animation style={{ opacity, transform: [{ scale: scale }] }}>
        <SignalItem signal={item} />
      </Block>
    );
  };

  return (
    <Body>
      <Block ph={20} pv={15} bg={ColorsDefault.bgPrimary}>
        <Search value={searchText} onChangeText={setTxt} placeholder='Search pairs...' />
      </Block>

      {isTheFirstOpenTabSignal && <SignalTabSkeleton />}

      {!isTheFirstOpenTabSignal && !Object.keys(signals).length && <NoData mt={150} />}

      {!isTheFirstOpenTabSignal && Object.keys(signals).length > 0 && (
        <List
          flex={1}
          data={Object.keys(signals)}
          animation
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          renderItem={({ item, index: parentIndex }) => {
            const data = signals[item]?.filter((signal: SignalItemType) =>
              signal?.pairs?.toLocaleUpperCase()?.includes(searchText?.toLocaleUpperCase()),
            );
            return (
              <Block>
                <Text mt={20} mh={24} mb={6} fontWeight='bold' color={ColorsDefault.textGrayDark}>
                  {item}
                </Text>
                <List
                  animation
                  data={data}
                  renderItem={({ item, index }) => {
                    const totalItemPrevies =
                      parentIndex === 0
                        ? 0
                        : signals[Object.keys(signals)[parentIndex - 1]]?.length;
                    return renderItem({ item, index, totalItemPrevies });
                  }}
                />
              </Block>
            );
          }}
          refreshControl={
            !isTheFirstOpenTabSignal && (
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

export default SignalScreen;
