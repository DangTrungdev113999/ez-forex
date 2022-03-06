/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, RefObject, memo, useLayoutEffect, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
import { Platform, TextInput } from 'react-native';
import FontFamilyDefault from '~/assets/fontFamily';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '../base';

import Input, { PropsType as InputRef } from '../base/Input';

type PropsType = InputRef & {
  inputRef?: RefObject<TextInput> | any;
  secureTextEntry?: boolean;
  hiseSecureTextEntry?: boolean;
};

const Password = ({ inputRef, hiseSecureTextEntry, ...rest }: PropsType) => {
  const [isSecure, setIsSecure] = useState(true);
  //   const { t } = useTranslation('common');
  const passwordRef = useRef();

  const onToggleSecure = () => {
    setIsSecure(!isSecure);
  };

  useLayoutEffect(() => {
    (inputRef || passwordRef)?.current?.setNativeProps({
      style: {
        fontFamily: Platform.OS === 'android' ? FontFamilyDefault.primaryMedium : undefined,
      },
    });
  }, [isSecure]);

  if (hiseSecureTextEntry) {
    return <Input ref={inputRef} placeholder={'Password'} height={40} {...rest} />;
  }

  return (
    <Input
      ref={inputRef || passwordRef}
      secureTextEntry={isSecure}
      height={40}
      iconRight={
        <IconSvg
          touchable
          xml={isSecure ? SvgDefault.eyeOff : SvgDefault.eye}
          onPress={onToggleSecure}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      }
      {...rest}
    />
  );
};

export default memo(Password);
