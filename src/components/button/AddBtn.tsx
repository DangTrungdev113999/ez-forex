import React, { Ref, memo, useRef, useEffect } from 'react';
import Touchable, { Propstype } from '../base/Touchable';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '~/components';
import { Animated, Easing } from 'react-native';

type PropsType = Propstype;

const AddBtn = (props: PropsType) => {
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
    <Touchable
      p={15}
      center
      middle
      borderRadius={12}
      absolute
      right={24}
      bottom={props.bottom || 30}
      shadow
      animation
      style={{
        opacity: opacityAnimated,
        transform: [{ scale: scaleAnimation }],
      }}
      {...props}>
      <IconSvg xml={SvgDefault.addItem} />
    </Touchable>
  );
};

export default memo(AddBtn);
