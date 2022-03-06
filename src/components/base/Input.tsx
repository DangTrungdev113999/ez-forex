/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { forwardRef, Ref, RefObject } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextInputProps,
  Platform,
} from 'react-native';
import { FieldError, useController, useForm } from 'react-hook-form';
import ColorsDefault from '~/assets/colors';
import FontFamilyDefault from '~/assets/fontFamily';
import { moderateScale, scale, SpaceInStyleType, verticalScale } from '~/common';
import { Block, Text, IconSvg } from '~/components';
import Gradient from './Gradient';
import { isAndroid } from '~/utils';

export type PropsType = TextInputProps &
  SpaceInStyleType & {
    label?: string;
    required?: boolean;
    description?: string;
    disabled?: boolean;
    loading?: boolean;
    iconLeft?: string;
    iconRight?: string | Element;
    iconRightPress?: () => void;
    error?: FieldError | boolean | undefined;
    errorMessage?: string;
    multiline?: boolean;
    height?: number;
    fontSize?: number;
    success?: boolean;
    name?: string;
    control?: any | undefined;
    gradient?: boolean;
    style?: Omit<StyleProp<ViewStyle>, 'height'>;
  };

const Input = (
  {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
    label,
    required,
    description,
    disabled,
    loading,
    iconLeft,
    iconRight,
    iconRightPress,
    error,
    errorMessage,
    height,
    multiline,
    fontSize,
    success,
    name,
    control,
    gradient,
    style,
    ...rest
  }: PropsType,
  ref: Ref<TextInput> | RefObject<TextInput> | any,
) => {
  const { control: controlDefault } = useForm();
  const { field } = useController({
    control: control || controlDefault,
    name: name as string,
  });

  const _renderLabel = () =>
    label && (
      <Text type='c1' mb={10} ml={4}>
        {label}
        {required && <Text color={ColorsDefault.textPink}>*</Text>}
      </Text>
    );

  const _renderIconLeft = () => iconLeft && <IconSvg xml={iconLeft} mr={10} />;

  const _renderIconRight = () =>
    iconRight && (
      <Block ml={5}>
        {typeof iconRight === 'string' ? (
          <IconSvg xml={iconRight} touchable={!!iconRightPress} onPress={iconRightPress} />
        ) : (
          iconRight
        )}
      </Block>
    );

  const _renderTextInput = () => {
    const textInputProps = {
      ref,
      editable: !disabled,
      placeholderTextColor: ColorsDefault.textGrayDark,
      multiline,
      ...rest,
    };

    const styledTextInput = [
      styles.textInput,
      disabled && styles.disabled,
      isAndroid && { paddingTop: 2 },
      fontSize ? moderateScale(fontSize) : { fontSize: moderateScale(12) },
      height ? { height: scale(height as number) } : { height: scale(44) },
      multiline && { paddingTop: 15, textAlignVertical: 'top' },
    ];

    if (control) {
      return (
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          style={styledTextInput as StyleProp<ViewStyle>}
          {...textInputProps}
        />
      );
    }

    return <TextInput style={styledTextInput as StyleProp<ViewStyle>} {...textInputProps} />;
  };

  const _renderErrorOrDescription = () => {
    if (error) {
      return (
        <Text type='c2' color={ColorsDefault.textRed} fontWeight='medium' ml={3} mt={8}>
          {errorMessage}
        </Text>
      );
    }

    if (description) {
      return (
        <Text type='c2' mt={5} ml={4}>
          {description}
        </Text>
      );
    }
    return null;
  };

  const styledWrapperContainer: SpaceInStyleType = {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
  };

  const styledWrapperInput = [
    style || styles.container,
    height ? { height: scale(height as number) } : { height: scale(44) },
    error && styles.error,
  ];

  if (gradient) {
    return (
      <Block {...styledWrapperContainer}>
        {_renderLabel()}
        <Gradient
          colors={[ColorsDefault.gradientPrimaryStart, ColorsDefault.gradientPrimaryEnd]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          row
          middle
          style={[styledWrapperInput, { paddingHorizontal: 16, borderColor: ColorsDefault.gray }]}>
          {_renderIconLeft()}
          {_renderTextInput()}
          {_renderIconRight()}
        </Gradient>
        {_renderErrorOrDescription()}
      </Block>
    );
  }

  return (
    <Block {...styledWrapperContainer}>
      {_renderLabel()}
      <Block row middle style={[styledWrapperInput, { paddingHorizontal: 16 }]}>
        {_renderIconLeft()}
        {_renderTextInput()}
        {_renderIconRight()}
      </Block>
      {_renderErrorOrDescription()}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorsDefault.bgPrimary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorsDefault.textGrayDark,
  },
  error: {
    borderColor: ColorsDefault.textRed,
    borderWidth: 1,
  },
  disabled: {
    color: ColorsDefault.gray,
  },

  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    color: ColorsDefault.textGrayLight,
    fontWeight: '500',
    fontFamily: FontFamilyDefault.primaryMedium,
  },
});

export default forwardRef(Input);
