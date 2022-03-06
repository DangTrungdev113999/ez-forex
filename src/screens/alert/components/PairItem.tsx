/* eslint-disable no-nested-ternary */
import React, { memo, useRef } from 'react';
import * as screenTypes from '~/common/screenTypes';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { Block, IconSvg, Image, Radio, Text, Touchable } from '~/components';
import { PAIR_ITEM_TYPE } from '~/common';
import { PairItemType } from '~/modules/alert/model';
import { useNavigation } from '@react-navigation/core';
import { Animated, Easing } from 'react-native';

type PropsType = {
  itemType: keyof typeof PAIR_ITEM_TYPE;
  item?: any;
  updateMode?: boolean;
  checked?: boolean;
  onHandlePicked?: any;
  fromScreen?: string;
};

function PairItem({ itemType, item, updateMode, checked, onHandlePicked, fromScreen }: PropsType) {
  const navigation = useNavigation();

  const translateXAnimation = useRef(new Animated.Value(15)).current;

  Animated.timing(translateXAnimation, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
    easing: Easing.ease,
  }).start();

  const translateX2Animation = translateXAnimation.interpolate({
    inputRange: [0, 15],
    outputRange: [0, -15],
  });

  const opacityAnimated = translateXAnimation.interpolate({
    inputRange: [0, 15],
    outputRange: [1, 0],
  });

  const onGotoAlertChannel = (item: PairItemType) => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.AlertChannelScreen,
        params: { pairs: item },
      } as never,
    );
  };

  if (itemType === PAIR_ITEM_TYPE.PRIMARY) {
    return (
      <Touchable
        flex={0.5}
        mt={8}
        mr={8}
        pv={12}
        center
        middle
        shadow
        bg={ColorsDefault.bgPrimary}
        borderRadius={12}
        onPress={() =>
          updateMode ? onHandlePicked(item as PairItemType) : onGotoAlertChannel(item)
        }>
        <Block width='100%' row justifyBetween>
          {updateMode && (
            <Radio pl={15} checked={checked} onPress={() => onHandlePicked(item as PairItemType)} />
          )}
          {!updateMode && <Block circle={24} pl={15} opacity={0} />}
          {item?.icon && (
            <Block ml={updateMode ? -15 : 0}>
              <IconSvg
                middle
                center
                uri={item.icon}
                animation
                style={{
                  opacity: opacityAnimated,
                  transform: [
                    {
                      translateX: translateXAnimation,
                    },
                  ],
                }}
              />
              <IconSvg
                mt={-10}
                mr={-12}
                middle
                center
                uri={item.icon1}
                animation
                style={{
                  opacity: opacityAnimated,
                  transform: [
                    {
                      translateX: translateX2Animation,
                    },
                  ],
                }}
              />
            </Block>
          )}

          <Block circle={24} opacity={0} />
        </Block>
        <Text mt={4} fontSize={12} fontWeight='medium' color={ColorsDefault.textGrayDark}>
          {item?.pairs || ''}
        </Text>
        <Text mt={4} fontSize={16} fontWeight='bold'>
          {item?.price || 0}
        </Text>
      </Touchable>
    );
  }

  if (itemType === PAIR_ITEM_TYPE.SECONDARY) {
    return (
      <Touchable
        flex={1}
        pv={10}
        ph={20}
        row
        justifyBetween
        borderBottom
        disabled={fromScreen === screenTypes.AlertScreen && item?.checked}
        bg={
          fromScreen === screenTypes.SubAlertScreen
            ? ColorsDefault.bgPrimary
            : item?.checked
            ? ColorsDefault.bgBody
            : ColorsDefault.bgPrimary
        }
        onPress={() => onHandlePicked(item as PairItemType)}>
        <Block flex={1} row middle>
          <Block>
            <IconSvg middle uri={item?.icon || ''} />
            <IconSvg mt={-10} mr={-12} middle center uri={item.icon1} />
          </Block>

          <Text ml={10} mt={5} type='c1' fontWeight='medium'>
            {item?.pairs || ''}
          </Text>
        </Block>
        <Block row middle>
          <Text mt={8} type='c1' fontWeight='medium'>
            {item?.price || 0}
          </Text>

          {fromScreen === screenTypes.AlertScreen && (
            <>
              {/* checked in api */}
              {item?.checked && <IconSvg ml={20} xml={SvgDefault.check2} />}

              {/* checked in local */}
              {checked && <IconSvg ml={20} xml={SvgDefault.check2} />}
              {!checked && !item?.checked && <Block ml={20} width={24} height={24} />}
            </>
          )}

          {fromScreen === screenTypes.SubAlertScreen && (
            <>
              {checked && <IconSvg ml={20} xml={SvgDefault.check2} />}
              {!checked && <Block ml={20} width={24} height={24} />}
            </>
          )}
        </Block>
      </Touchable>
    );
  }

  if (itemType === PAIR_ITEM_TYPE.SAMLL) {
    return (
      <Touchable
        flex={1}
        mv={8}
        mh={10}
        height={30}
        center
        middle
        shadow
        borderRadius={5}
        disabled={fromScreen === screenTypes.AlertScreen && item?.checked}
        bg={
          fromScreen === screenTypes.AlertScreen && item?.checked
            ? ColorsDefault.gray
            : checked
            ? ColorsDefault.pink
            : ColorsDefault.blue
        }
        onPress={() => onHandlePicked(item as PairItemType)}>
        <Text mt={2} type='c1'>
          {item?.pairs || ''}
        </Text>
      </Touchable>
    );
  }

  return <Block />;
}

export default memo(PairItem);
