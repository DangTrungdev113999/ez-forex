import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

type Propstype = SpaceInStyleType &
  LayoutInStyleType &
  BorderInStyleType &
  BackgroudInStyleType & {
    shadowColor?: string;
    colors: string[];
    start?: Record<'x' | 'y', number>;
    end?: Record<'x' | 'y', number>;
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
  };

const Gradient = ({
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
  opacity,
  shadow,

  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },

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

    borderRadius && { borderRadius },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    opacity && { opacity },
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
      shadowColor: ColorsDefault?.gray || shadowColor,
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 5,
      shadowRadius: 5,
      elevation: 1,
    },
    style && style,
  ];
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={styledComponent as StyleProp<ViewStyle>}
      {...rest}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;
