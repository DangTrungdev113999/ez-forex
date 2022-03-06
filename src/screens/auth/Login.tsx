import React, { useRef, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { Block, Body, Button, Text, IconSvg, Email, Password } from '~/components';
import Touchable from '~/components/base/Touchable';

import * as screenTypes from '~/common/screenTypes';
import { LogInDataType } from '~/modules/auth/model';
import { logInWithEmail } from '~/modules/auth/slice';
import { firebaseTokenSelector, logInLoadingSelector } from '~/modules/auth/selectors';
import { schemaLogin } from '~/modules/auth/validation';
import { useAppDispatch, useAppSelector, useGetFirebaseToken } from '~/hook';
import { userInfoSelector } from '~/modules/account/selectors';

import { Keyboard } from 'react-native';

const useIsShowKeyboard = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardWillShow = () => {
    console.log('keyboardWillShow');
    setIsShowKeyboard(true);
  };

  const keyboardWillHide = () => {
    console.log('keyboardWillHide');
    setIsShowKeyboard(false);
  };

  return {
    isShowKeyboard,
  };
};

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const userInfo = useAppSelector(userInfoSelector);
  const logInLoading = useAppSelector(logInLoadingSelector);
  const firebaseToken = useAppSelector(firebaseTokenSelector);

  const passwordRef = useRef<TextInput>();

  useGetFirebaseToken();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    console.log('keyboardWillShow');
  };

  const keyboardDidHide = () => {
    console.log('keyboardDidHide');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LogInDataType>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: userInfo.email,
      password: __DEV__ ? '123456a@' : '',
    },
  });

  useEffect(() => {
    setValue('email', userInfo.email);
  }, [userInfo.email]);

  const onHandleLogin = (data: LogInDataType) => {
    dispatch(
      logInWithEmail({
        data: {
          ...data,
          firebaseToken,
        },
      }),
    );
  };

  const goToSignUpScreen = () => {
    navigation.navigate(
      screenTypes.AuthStack as never,
      {
        screen: screenTypes.SignUpScreen,
      } as never,
    );
  };

  const onFocusPassword = () => passwordRef.current?.focus();

  return (
    <Body pt={insets.top + 30} keyboardAvoid loading={logInLoading}>
      <IconSvg mb={36} center middle xml={SvgDefault.brand} iconWidth={92} iconHeight={87} />

      <Block
        flexGrow={1}
        ph={30}
        pb={40}
        bg={ColorsDefault.bgPrimary}
        borderTLRadius={40}
        borderTRRadius={40}>
        <Text mt={50} type='h5' textCenter>
          Welcome to EZforex
        </Text>
        <Text mt={5} type='h2' fontWeight='semiBold' textCenter>
          Let’s sign you in.
        </Text>

        <Email
          mt={30}
          label='Email'
          name='email'
          selectTextOnFocus
          returnKeyType='next'
          onSubmitEditing={onFocusPassword}
          control={control}
          error={errors.email}
          errorMessage={errors.email?.message}
        />

        <Password
          mt={16}
          inputRef={passwordRef}
          label='Password'
          placeholder='Enter your password'
          name='password'
          control={control}
          error={errors.password}
          errorMessage={errors.password?.message}
        />

        {/* <Block mt={15} row>
          <Block flex={0.6} />
          <Touchable flex={0.4} hitSlop={{ top: 10, bottom: 20, left: 50, right: 50 }}>
            <Text type='c1' fontWeight='medium' color={ColorsDefault.textGrayDark} textRight>
              Forgot Password?
            </Text>
          </Touchable>
        </Block> */}

        <Button mt={35} variant='primary' onPress={handleSubmit(onHandleLogin)}>
          LOGIN
        </Button>

        <Block row center middle mt={20}>
          <Text fontWeight='bold' lineHeight={21}>
            Don’t have account?
          </Text>
          <Touchable
            ml={5}
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={goToSignUpScreen}>
            <Text mt={2} fontWeight='bold' color={ColorsDefault.textPurple}>
              SIGN UP
            </Text>
          </Touchable>
        </Block>
      </Block>
    </Body>
  );
}

export default LoginScreen;
