import React, { memo, ReactNode } from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import {
  BackgroudInStyleType,
  BorderInStyleType,
  LayoutInStyleType,
  moderateScale,
  scale,
  SpaceInStyleType,
  verticalScale,
} from '~/common';
import ColorsDefault from '~/assets/colors';

export type Propstype = Omit<TouchableOpacityProps, 'onPress'> &
  SpaceInStyleType &
  LayoutInStyleType &
  BorderInStyleType &
  BackgroudInStyleType & {
    shadowColor?: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined | any;
    animation?: boolean;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
  };

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Touchable = ({
  flex,
  m,
  mt,
  mr,
  mb,
  ml,
  mv,
  mh,
  p,
  pt,
  pr,
  pb,
  pl,
  pv,
  ph,
  width,
  height,
  wrap,
  row,
  column,
  direction,
  center,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  justifyEvenly,
  justify,
  middle,
  alignItemsStart,
  alignItemsEnd,
  alignItems,
  alignSelfCenter,
  borderRadius,
  borderWidth,
  borderTRRadius,
  borderTLRadius,
  borderBRRadius,
  borderBLRadius,
  borderColor,
  borderBottom,
  shadowColor,
  absolute,
  relative,
  top,
  left,
  bottom,
  right,
  zIndex,
  circle,
  bg,
  opacity,
  shadow,
  animation,
  children,
  style,
  ...rest
}: Propstype) => {
  const styledComponent = [
    flex && { flex },
    width && { width: typeof width === 'number' ? scale(width) : width },
    height && {
      height: typeof height === 'number' ? scale(height) : height,
    },

    m && { margin: moderateScale(m) },
    mt && { marginTop: verticalScale(mt) },
    mr && { marginRight: scale(mr) },
    mb && { marginBottom: verticalScale(mb) },
    ml && { marginLeft: scale(ml) },
    mh && { marginHorizontal: scale(mh) },
    mv && { marginVertical: verticalScale(mv) },
    p && { padding: moderateScale(p) },
    pt && { paddingTop: verticalScale(pt) },
    pr && { paddingRight: scale(pr) },
    pb && { paddingBottom: verticalScale(pb) },
    pl && { paddingLeft: scale(pl) },
    ph && { paddingHorizontal: scale(ph) },
    pv && { paddingVertical: verticalScale(pv) },
    circle && {
      width: circle,
      height: circle,
      borderRadius: circle / 2,
    },

    row && { flexDirection: 'row' },
    column && { flexDirection: 'column' },
    direction && { flexDirection: direction },
    wrap && { flexWrap: 'wrap' },
    center && { justifyContent: 'center' },
    justifyStart && { justifyContent: 'flex-start' },
    justifyEnd && { justifyContent: 'flex-end' },
    justifyAround && { justifyContent: 'space-around' },
    justifyBetween && { justifyContent: 'space-between' },
    justifyEvenly && { justifyContent: 'space-evenly' },
    justify && { justifyContent: justify },
    middle && { alignItems: 'center' },
    alignItemsStart && { alignItems: 'flex-start' },
    alignItemsEnd && { alignItems: 'flex-end' },
    alignItems && { alignItems },
    alignSelfCenter && { alignSelf: 'center' },

    borderTRRadius && { borderTopRightRadius: borderTRRadius },
    borderTLRadius && { borderTopLeftRadius: borderTLRadius },
    borderBRRadius && { borderBottomLeftRadius: borderBRRadius },
    borderBLRadius && { borderBottomRightRadius: borderBLRadius },

    bg && { backgroundColor: bg },
    borderRadius && { borderRadius },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    (opacity || opacity === 0) && { opacity },
    borderBottom && {
      borderBottomWidth: 1,
      borderBottomColor: ColorsDefault.gray,
    },
    absolute && { position: 'absolute' },
    relative && { position: 'relative' },
    (top || top === 0) && { top },
    (left || left === 0) && { left },
    (bottom || bottom === 0) && { bottom },
    (right || right === 0) && { right },
    zIndex && { zIndex },
    shadow && {
      shadowColor: ColorsDefault.shadow || shadowColor,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 5,
      shadowRadius: 10,
      elevation: 5,
    },
    style && style,
  ];

  if (animation) {
    return (
      <AnimatedTouchableOpacity style={styledComponent as StyleProp<ViewStyle>} {...rest}>
        {children}
      </AnimatedTouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styledComponent as StyleProp<ViewStyle>} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(Touchable);
