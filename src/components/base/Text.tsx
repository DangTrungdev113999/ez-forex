/* eslint-disable react/jsx-wrap-multilines */
import React, { memo } from 'react';
import { StyleProp, Text, ViewStyle, TextProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { moderateScale, SpaceInStyleType, LayoutInStyleType } from '~/common';
import FontSizeDefault from '~/assets/fontSize';
import ColorsDefault from '~/assets/colors';
import FontFamilyDefault, { FontsFamilyType } from '~/assets/fontFamily';

type FontWeightType = 'thin' | 'light' | 'medium' | 'semiBold' | 'bold' | 'extraBold';

type TextType = 'h1' | 'h2' | 'h3' | 'h5' | 'c1' | 'c2';

export type PropsType = TextProps &
  SpaceInStyleType &
  LayoutInStyleType & {
    fontSize?: number;
    fontWeight?: FontWeightType;
    color?: keyof typeof ColorsDefault | string;
    type?: TextType;
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    capitalize?: boolean;
    lineThrough?: boolean;
    fontFamily?: FontsFamilyType;
    lineHeight?: number;
    letterSpacing?: number;
    textCenter?: boolean;
    textRight?: boolean;
    textLeft?: boolean;
    gradient?: boolean;
    children?: string | string[] | Element;
    style?: StyleProp<ViewStyle>;
  };

const TextView = ({
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
  type,
  textCenter,
  textRight,
  textLeft,
  fontSize,
  fontWeight,
  italic,
  fontFamily,
  underline,
  lineThrough,
  uppercase,
  lowercase,
  capitalize,
  lineHeight,
  letterSpacing,
  color,
  maxWidth,
  maxHeight,
  justifyStart,
  justifyEnd,
  alignItemsStart,
  alignItemsEnd,
  gradient,
  children,
  style,
  ...rest
}: PropsType) => {
  const MAP_FONT_FAMILY: Record<FontWeightType, string> = {
    thin: FontFamilyDefault.primaryThin,
    light: FontFamilyDefault.primaryLight,
    medium: FontFamilyDefault.primaryMedium,
    semiBold: FontFamilyDefault.primarySemiBold,
    bold: FontFamilyDefault.primaryBold,
    extraBold: FontFamilyDefault.primaryExtraBold,
  };

  const MAP_FONT_WEIGHT = {
    thin: '100',
    light: '300',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  };

  const MAP_TYPE_TO_TEXT_STYLE: Record<TextType, Record<'fontSize' | 'lineHeight', number>> = {
    h1: {
      fontSize: FontSizeDefault.FONT_32,
      lineHeight: lineHeight || 44,
    },
    h2: {
      fontSize: moderateScale(FontSizeDefault.FONT_24),
      lineHeight: lineHeight || 34,
    },
    h3: {
      fontSize: moderateScale(FontSizeDefault.FONT_20),
      lineHeight: lineHeight || 28,
    },
    h5: {
      fontSize: moderateScale(FontSizeDefault.FONT_16),
      lineHeight: lineHeight || 22,
    },
    c1: {
      fontSize: moderateScale(FontSizeDefault.FONT_12),
      lineHeight: lineHeight || 18,
    },
    c2: {
      fontSize: moderateScale(FontSizeDefault.FONT_10),
      lineHeight: lineHeight || 15,
    },
  };

  const styledComponent = [
    {
      fontSize: moderateScale(14),
      fontWeight: '400',
      lineHeight: 18,
      fontFamily: FontFamilyDefault.primaryRegular,
      color: ColorsDefault.textWhite,
    },

    flex && { flex },
    m && { margin: moderateScale(m) },
    mt && { marginTop: moderateScale(mt) },
    mr && { marginRight: moderateScale(mr) },
    mb && { marginBottom: moderateScale(mb) },
    ml && { marginLeft: moderateScale(ml) },
    mh && { marginHorizontal: moderateScale(mh) },
    mv && { marginVertical: moderateScale(mv) },
    p && { padding: moderateScale(p) },
    pt && { paddingTop: moderateScale(pt) },
    pr && { paddingRight: moderateScale(pr) },
    pb && { paddingBottom: moderateScale(pb) },
    pl && { paddingLeft: moderateScale(pl) },
    ph && { paddingHorizontal: moderateScale(ph) },
    alignItemsStart && { alignItems: 'flex-start' },
    alignItemsEnd && { alignItems: 'flex-end' },
    justifyStart && { justifyContent: 'flex-start' },
    justifyEnd && { justifyContent: 'flex-end' },
    textCenter && { textAlign: 'center' },
    textRight && { alignSelf: 'flex-end', textAlign: 'right' },
    textLeft && { alignSelf: 'flex-start', textAlign: 'left' },
    maxWidth && { maxWidth },
    maxHeight && { maxHeight },

    type && {
      fontSize: MAP_TYPE_TO_TEXT_STYLE[type as TextType].fontSize,
      lineHeight: MAP_TYPE_TO_TEXT_STYLE[type as TextType].lineHeight,
    },

    color && {
      color,
    },

    fontSize && {
      fontSize,
    },

    fontWeight && {
      fontFamily: MAP_FONT_FAMILY[fontWeight],
      fontWeight: MAP_FONT_WEIGHT[fontWeight],
    },

    lineHeight && {
      lineHeight,
    },

    italic && {
      fontStyle: 'italic',
    },
    uppercase && {
      textTransform: 'uppercase',
    },
    lowercase && {
      textTransform: 'lowercase',
    },
    capitalize && {
      textTransform: 'capitalize',
    },
    underline && { textDecorationLine: 'underline' },
    lineThrough && { textDecorationLine: 'line-through' },

    letterSpacing && {
      letterSpacing,
    },
    style && style,
  ];

  const GradientText = (props: any) => (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[`${ColorsDefault.card3GradientStart}`, `${ColorsDefault.card3GradientEnd}`]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );

  if (gradient) {
    return <GradientText style={styledComponent}>{children}</GradientText>;
  }

  return (
    <Text style={styledComponent as StyleProp<ViewStyle>} {...rest}>
      {children}
    </Text>
  );
};

export default memo(TextView);
