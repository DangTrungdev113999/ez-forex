import * as React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { SIGNALS_STATUS, SIGNALS_TYPE, scale, MAP_SIGN_STATUS } from '~/common';

import { Block, Body, Text, IconSvg, MyRefreshControl } from '~/components';
import { SignalItemType } from '~/modules/signal/model';
import { fetchSignalsDetailApi } from '~/modules/signal/apis';
import { useNavigationSetOption } from '~/hook';
import { Animated, Easing } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { formatTime } from '~/utils';

dayjs.extend(relativeTime);

type ParamList = {
  Detail: {
    signal?: SignalItemType;
    id: number;
  };
};

function Item({
  label,
  value,
  colorText,
  translateYAnimation,
  opacityAnimated,
  icon,
  ...rest
}: {
  label: string;
  value: number | string;
  colorText?: string;
  translateYAnimation?: any;
  opacityAnimated?: any;
  icon?: string;
}) {
  return (
    <Block
      pv={8}
      row
      justifyBetween
      borderBottom
      animation
      style={{ transform: [{ translateY: translateYAnimation }], opacity: opacityAnimated }}
      {...rest}>
      <Text type='c1'>{label}</Text>

      <Block row>
        {icon && <IconSvg mr={10} xml={icon} iconWidth={18} iconHeight={18} />}

        <Text type='c1' color={colorText || ColorsDefault.textWhite}>
          {value}
        </Text>
      </Block>
    </Block>
  );
}

function SignalDetailScreen() {
  const [signal, setSignal] = React.useState<SignalItemType>({});
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [showBottomBorder, setShow] = React.useState<boolean>(false);

  const translateYAnimation = React.useRef(new Animated.Value(10)).current;

  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const { signal: data, id } = route.params;

  const onFetchData = async (isRefresh: boolean = false) => {
    try {
      if (isRefresh) {
        setRefreshLoading(true);
      }
      const result = await fetchSignalsDetailApi({ id });
      setSignal(result);
      setRefreshLoading(false);
    } catch (error) {
      setRefreshLoading(false);
    }
  };

  React.useEffect(() => {
    Animated.delay(100);
    Animated.timing(translateYAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    if (data?.pairs) return setSignal(data);
    if (id) {
      onFetchData();
    }
  }, [id]);

  useNavigationSetOption(
    {
      title: signal?.pairs || '',
    },
    [signal?.pairs],
  );

  const opacityAnimated = translateYAnimation.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
  });

  const scaleAnimated = translateYAnimation.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0.9],
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 24,
      }}
      refreshControl={
        <MyRefreshControl refreshing={refreshLoading} onRefresh={() => onFetchData(true)} />
      }>
      <Block
        mt={20}
        p={16}
        pb={8}
        bg={ColorsDefault.bgPrimary}
        borderBLRadius={20}
        borderBRRadius={20}
        borderTRRadius={20}>
        <Block row middle>
          <Block
            circle={64}
            borderRadius={32}
            borderColor={ColorsDefault.white1}
            borderWidth={1}
            animation
            style={{
              overflow: 'hidden',
              opacity: opacityAnimated,
            }}>
            {signal?.icon && <IconSvg iconHeight={64} iconWidth={64} uri={signal?.icon} />}
          </Block>

          {!signal?.icon && <IconSvg xml={SvgDefault.flagDemo} />}

          <Block ml={20} flex={1} animation style={{ opacity: opacityAnimated }}>
            <Block row justifyBetween>
              <Block row>
                <Text type='h5' color={ColorsDefault.textWhite}>
                  {signal?.pairs || ''}
                </Text>
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
                }>
                {signal?.type || ''}
              </Text>
            </Block>
            <Text mt={4} type='c2' color={ColorsDefault.textGrayDark}>
              {dayjs(signal?.createdAt).toNow(true)} ago
            </Text>
          </Block>
        </Block>

        {signal?.closeTime && (
          <Block
            mt={20}
            pv={8}
            row
            justifyBetween
            borderBottom
            animation
            style={{
              transform: [{ translateY: translateYAnimation }],
              opacity: opacityAnimated,
            }}>
            <Text type='c1'>Close Time</Text>
            <Text type='c1'>{dayjs.unix(signal?.closeTime).format('HH:mm DD-MM-YYYY')}</Text>
          </Block>
        )}

        {signal?.sentOn && (
          <Item
            mt={20}
            label={'Sent on'}
            value={dayjs.unix(signal?.sentOn).format('HH:mm DD-MM-YYYY')}
            translateYAnimation={translateYAnimation}
            opacityAnimated={opacityAnimated}
          />
        )}

        <Item
          label={'Open Price'}
          value={signal?.openPrice || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
        />

        <Item
          label={'Take Profit 1'}
          value={signal?.tp1 || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
          icon={signal.signalStatus === 'Hit_tp_1' && SvgDefault.success}
        />

        <Item
          label={'Take Profit 2'}
          value={signal?.tp2 || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
          icon={signal.signalStatus === 'Hit_tp_2' && SvgDefault.success}
        />

        <Item
          label={'Take Profit 3'}
          value={signal?.tp3 || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
          icon={signal.signalStatus === 'Hit_tp_3' && SvgDefault.success}
        />

        <Item
          label={'Stop Loss'}
          value={signal?.stopLoss || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
          colorText={ColorsDefault.textGreen}
          icon={signal.signalStatus === 'Sl_Hit' && SvgDefault.faild}
        />

        <Item
          label={'Signal Status'}
          value={MAP_SIGN_STATUS[signal?.signalStatus] || 0}
          translateYAnimation={translateYAnimation}
          opacityAnimated={opacityAnimated}
          colorText={
            signal?.signalStatus?.toLowerCase() === SIGNALS_STATUS.LIVE.toLowerCase()
              ? ColorsDefault.textGreen
              : ColorsDefault.textRed
          }
        />
      </Block>

      <Block
        mt={12}
        p={16}
        bg={ColorsDefault.bgPrimary}
        borderRadius={20}
        animation
        style={{ opacity: opacityAnimated }}>
        <Text fontSize={14} color={ColorsDefault.textPurple}>
          REASON
        </Text>
        <Text fontSize={12} mt={10}>
          {signal?.reason || ''}
        </Text>
      </Block>

      <Block
        mt={12}
        mb={80}
        p={16}
        bg={ColorsDefault.bgPrimary}
        borderRadius={20}
        animation
        style={{ opacity: opacityAnimated }}>
        <Block row justifyBetween>
          <Text fontSize={14} color={ColorsDefault.textPurple}>
            Real Time Update
          </Text>
          <Text type='c1'>
            {' '}
            {formatTime({
              date: signal.createdAt,
            })}
          </Text>
        </Block>

        <Text fontSize={12} mt={10}>
          {signal?.realTimeUpdate || ''}
        </Text>
      </Block>
    </ScrollView>
  );
}

export default SignalDetailScreen;
