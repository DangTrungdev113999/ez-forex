import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { Block, Text, IconSvg, Touchable } from '~/components';

import * as screenTypes from '~/common/screenTypes';
import { SIGNALS_TYPE, scale } from '~/common';
import { SignalItemType } from '~/modules/signal/model';

dayjs.extend(relativeTime);
interface PropTypes {
  signal: SignalItemType;
}

function SignalItem({ signal }: PropTypes) {
  const navigation = useNavigation();

  const translateAnimation = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;

  React.useEffect(() => {
    Animated.delay(100);
    Animated.timing(translateAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.exp,
    }).start();
  }, []);

  const goToSignalDetailScreen = (title: string) => {
    navigation.navigate(
      screenTypes.SignalDetailStack as never,
      {
        screen: screenTypes.SignalDetailScreen,
        params: {
          title,
          signal,
          id: signal?.id,
        },
      } as never,
    );
  };

  const opacityAnimated = translateAnimation.x.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
  });

  return (
    <Touchable
      flex={1}
      mt={8}
      p={16}
      mh={20}
      row
      shadow
      bg={ColorsDefault.bgPrimary}
      borderBLRadius={20}
      borderBRRadius={36}
      borderTRRadius={20}
      animation
      style={{
        transform: [{ translateX: translateAnimation.x }, { translateY: translateAnimation.y }],
        opacity: opacityAnimated,
      }}
      onPress={() => goToSignalDetailScreen(signal?.pairs || '')}>
      <Block
        circle={64}
        borderRadius={32}
        borderColor={ColorsDefault.white1}
        borderWidth={1}
        shadow
        style={{ overflow: 'hidden' }}>
        {signal?.icon && <IconSvg flex={1} iconWidth={64} iconHeight={64} uri={signal?.icon} />}
      </Block>
      {!signal?.icon && <IconSvg xml={SvgDefault.flagDemo} />}
      <Block mt={2} ml={13} flex={1}>
        <Block row justifyBetween>
          <Block row>
            <Text type='h5'>{signal?.pairs || ''}</Text>
            <IconSvg
              xml={
                signal?.type?.toLowerCase() === SIGNALS_TYPE.BUY.toLowerCase()
                  ? SvgDefault.trendingUp
                  : SvgDefault.trendingDown
              }
              mh={10}
            />
          </Block>
          <Text
            color={
              signal?.type?.toLowerCase() === SIGNALS_TYPE.BUY.toLowerCase()
                ? ColorsDefault.textGreen
                : ColorsDefault.textRed
            }
            uppercase>
            {signal?.type || ''}
          </Text>
        </Block>

        <Block mt={1} row justifyBetween>
          <Text mt={5} color={ColorsDefault.textGrayDark}>
            {signal?.openPrice || 0}
          </Text>
          <Text mt={5} type='c1' fontWeight='medium' color={ColorsDefault.textGreen}>
            <Text ml={3} type='c1' fontWeight='medium' color={ColorsDefault.textGrayDark}>
              TP{' '}
            </Text>
            {signal?.takeProfit || 1}
          </Text>
          <Text mt={5} type='c1' fontWeight='medium' color={ColorsDefault.textOrange}>
            <Text ml={3} type='c1' fontWeight='medium' color={ColorsDefault.textGrayDark}>
              SL{' '}
            </Text>
            {signal?.stopLoss || 0}
          </Text>
        </Block>

        <Text mt={3} type='c2' fontWeight='light' color={ColorsDefault.textGrayDark}>
          {dayjs(signal?.createdAt).toNow(true)} ago
        </Text>
      </Block>
    </Touchable>
  );
}

export default SignalItem;
