import React, { memo, ReactNode } from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import Touchable, { Propstype as TouchableType } from './Touchable';
import Text, { PropsType as TextType } from './Text';
import ColorsDefault from '~/assets/colors';

type VariantType = 'primary' | 'secondary' | 'small';

type ColorKeyType = keyof typeof ColorsDefault;

type Propstype = TouchableType & {
  variant: VariantType;
  textColor?: ColorKeyType;
  gradient?: boolean;
  children?: ReactNode | string;
  onPress?: unknown;
  style?: StyleProp<ViewStyle>;
};

type TextVariantType = Omit<TextType, 'style'>;

const Button = ({
  variant,
  bg,
  textColor,
  borderColor,
  gradient,
  children,
  ...rest
}: Propstype) => {
  // Primary type
  const btnPrimaryStyle: TouchableType = {
    bg: (bg as ColorKeyType) || ColorsDefault.btnPrimary,
    borderRadius: 12,
    center: true,
    middle: true,
    pv: 12,
  };

  const btnTextPrimaryStyle: TextVariantType = {
    color: (textColor as ColorKeyType) || ColorsDefault.white,
    fontWeight: 'bold',
  };

  // Secondary type
  const btnSecondaryStyle: TouchableType = {
    height: 32,
    ph: 14,
    bg: (bg as ColorKeyType) || ColorsDefault.btnSecondary1,
    borderWidth: 1,
    borderColor: (borderColor as ColorKeyType) || ColorsDefault.white1,
    borderRadius: 8,
    center: true,
    middle: true,
  };

  const btnTextSecondaryStyle: TextVariantType = {
    type: 'c1',
    color: (textColor as ColorKeyType) || ColorsDefault.textWhite,
    uppercase: true,
    fontWeight: 'semiBold',
  };

  // Small stype
  const btnSmallStyle: TouchableType = {
    height: 23,
    ph: 20,
    bg: (bg as ColorKeyType) || ColorsDefault.btnSecondary1,
    borderWidth: 1,
    borderColor: (borderColor as ColorKeyType) || ColorsDefault.white1,
    borderRadius: 8,
    center: true,
    middle: true,
  };

  const btnTextSmallaryStyle: TextVariantType = {
    type: 'c1',
    color: (textColor as ColorKeyType) || ColorsDefault.textWhite,
    uppercase: true,
    fontWeight: 'semiBold',
  };

  const MAP_VARIANT_TO_BUTTON_TYPE: Record<
    VariantType,
    Record<'btnStyle' | 'btnTextStyle', TextVariantType | TouchableType>
  > = {
    primary: {
      btnStyle: btnPrimaryStyle,
      btnTextStyle: btnTextPrimaryStyle,
    },
    secondary: {
      btnStyle: btnSecondaryStyle,
      btnTextStyle: btnTextSecondaryStyle,
    },
    small: {
      btnStyle: btnSmallStyle,
      btnTextStyle: btnTextSmallaryStyle,
    },
  };

  return (
    <Touchable {...MAP_VARIANT_TO_BUTTON_TYPE[variant].btnStyle} {...rest}>
      {typeof children === 'string' && (
        <Text {...MAP_VARIANT_TO_BUTTON_TYPE[variant].btnTextStyle}>{children as string}</Text>
      )}

      {typeof children !== 'string' && children}
    </Touchable>
  );
};

export default memo(Button);
