import React, { Ref } from 'react';
import { TextInput } from 'react-native';
import Input, { PropsType as InputProps } from '../base/Input';

type PropsType = InputProps & {
  ref?: Ref<TextInput>;
};

export const Email = ({ ref, ...rest }: PropsType) => (
  <Input
    ref={ref}
    placeholder={'Email'}
    keyboardType='email-address'
    height={40}
    {...rest}
    maxLength={254}
  />
);
