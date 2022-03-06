import React, { Ref, memo } from 'react';
// import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import SvgDefault from '~/assets/svg';
import Input, { PropsType as InputProps } from '../base/Input';

type PropsType = InputProps & {
  inputRef?: Ref<TextInput>;
};

const Search = ({ inputRef, placeholder, value, onChangeText, ...rest }: PropsType) => {
  const onClearValue = () => {
    onChangeText('');
  };

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder || 'Search'}
      iconRight={value?.length ? SvgDefault.clearIcon : SvgDefault.searchIcon}
      height={40}
      maxLength={254}
      value={value}
      onChangeText={onChangeText}
      iconRightPress={onClearValue}
      gradient
      {...rest}
    />
  );
};

export default memo(Search);
