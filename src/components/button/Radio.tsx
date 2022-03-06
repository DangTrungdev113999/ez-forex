import React, { memo, useRef } from 'react';
import SvgDefault from '~/assets/svg';

import { IconSvg } from '../base';

import { Propstype as TouchableType } from '~/components/base/Touchable';
import { Animated, Easing } from 'react-native';

const MAP_COLOR_ACTIVE = {
  purple: SvgDefault.radioPurpleActive,
};

type PropsType = TouchableType & {
  checked?: boolean;
  color?: keyof typeof MAP_COLOR_ACTIVE;
};

const Radio = ({ checked, color, ...rest }: PropsType) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;

  Animated.timing(scaleAnimation, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const opacityAnimated = scaleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  return (
    <IconSvg
      touchable
      xml={
        checked
          ? MAP_COLOR_ACTIVE[color as keyof typeof MAP_COLOR_ACTIVE] || SvgDefault.radioActive
          : SvgDefault.radio
      }
      animation
      style={{
        opacity: opacityAnimated,
        transform: [{ scale: scaleAnimation }],
      }}
      {...rest}
    />
  );
};

export default memo(Radio);
