import React, { Ref } from 'react';
// import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import Input, { PropsType as InputProps } from '../base/Input';

type PropsType = InputProps & {
  inputRef?: Ref<TextInput> | any;
};

const Email = ({ inputRef, ...rest }: PropsType) => (
  //   const { t } = useTranslation('common');Ref

  <Input
    ref={inputRef}
    placeholder={'Email'}
    keyboardType='email-address'
    height={44}
    {...rest}
    maxLength={254}
  />
);

export default Email;
