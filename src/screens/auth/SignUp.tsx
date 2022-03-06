import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import {
  Block,
  Body,
  Button,
  Text,
  IconSvg,
  Input,
  Email,
  Password,
  CountriesModal,
} from '~/components';
import Touchable from '~/components/base/Touchable';

import * as screenTypes from '~/common/screenTypes';
import { SignUpDataType } from '~/modules/auth/model';
import { schemaRegister } from '~/modules/auth/validation';
import { signUp } from '~/modules/auth/slice';
import { useAppDispatch, useAppSelector } from '~/hook';
import { firebaseTokenSelector, signUpLoadingSelector } from '~/modules/auth/selectors';
import { showToastError } from '~/utils';
import { saveCountries } from '~/modules/account/slice';

function SignUpScreen() {
  const [checked, setChecked] = useState(false);
  const [country, setCountry] = useState('Viet Nam');
  const [visible, setVisible] = useState(false);

  const signUpLoading = useAppSelector(signUpLoadingSelector);
  const firebaseToken = useAppSelector(firebaseTokenSelector);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const emailRef = useRef<TextInput>();
  const phoneRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataType>({
    resolver: yupResolver(schemaRegister),
    defaultValues: {
      username: __DEV__ ? `user${Math.round(Math.random() * 1000000)}` : '',
      email: __DEV__ ? `user${Math.round(Math.random() * 1000000)}@gmail.com` : '',
      phone: __DEV__ ? '0321234567' : '',
      password: __DEV__ ? '123456a@' : '',
    },
  });

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const countries = data.map(item => item.name);
        dispatch(saveCountries(countries));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const onHandleSignUp = (data: SignUpDataType) => {
    if (!checked) {
      return showToastError({
        message: 'You disagree with Terms Of Services and Privacy Policy',
      });
    }
    dispatch(
      signUp({
        data: {
          ...data,
          firebaseToken,
          country,
        },
        onSuccess: () => {
          navigation.goBack();
        },
      }),
    );
  };

  const onToggleChecked = () => {
    setChecked(prev => !prev);
  };

  const onOpenCountriesModal = () => {
    setVisible(true);
  };

  const onCloseCountriesModal = () => {
    setVisible(false);
  };

  const goToSignInScreen = () => {
    navigation.navigate(
      screenTypes.AuthStack as never,
      {
        screen: screenTypes.LoginScreen,
      } as never,
    );
  };

  const onFocusNextInput = targetRef => targetRef.current?.focus();

  return (
    <Body pt={insets.top} scroll keyboardAvoid loading={signUpLoading}>
      <IconSvg
        mt={30}
        mb={36}
        iconWidth={63}
        iconHeight={60}
        center
        middle
        xml={SvgDefault.brand}
      />

      <Block
        flexGrow={1}
        ph={30}
        pb={40}
        bg={ColorsDefault.bgPrimary}
        borderTLRadius={40}
        borderTRRadius={40}>
        <Text mt={30} type='h5' textCenter>
          Create Free Account
        </Text>
        <Text mt={5} type='h2' fontWeight='semiBold' textCenter>
          Join with us.
        </Text>

        <Input
          mt={30}
          label='Username'
          placeholder='Enter username'
          name='username'
          control={control}
          error={errors.username}
          errorMessage={errors.username?.message}
          returnKeyType='next'
          onSubmitEditing={() => onFocusNextInput(emailRef)}
        />

        <Email
          mt={15}
          inputRef={emailRef}
          label='Email'
          name='email'
          control={control}
          error={errors.email}
          errorMessage={errors.email?.message}
          returnKeyType='next'
          onSubmitEditing={() => onFocusNextInput(phoneRef)}
        />

        <Input
          mt={15}
          ref={phoneRef}
          label='Phone Number'
          placeholder='Enter your phone number'
          name='phone'
          keyboardType='numeric'
          control={control}
          error={errors.phone}
          errorMessage={errors.phone?.message}
          returnKeyType='next'
          onSubmitEditing={() => onFocusNextInput(passwordRef)}
        />

        <Text mt={15} type='c1' fontWeight='medium' mb={10} ml={4}>
          Country
        </Text>
        <Touchable
          p={10}
          height={40}
          center
          bg={ColorsDefault.bgPrimary}
          borderRadius={12}
          borderWidth={1}
          borderColor={ColorsDefault.textGrayDark}
          onPress={onOpenCountriesModal}>
          <Text type='c1' color={ColorsDefault.textGrayLight} fontWeight='medium'>
            {country || 'Select your country'}
          </Text>
        </Touchable>

        <Password
          mt={15}
          inputRef={passwordRef}
          label='Password'
          placeholder='Enter your password'
          name='password'
          control={control}
          error={errors.password}
          errorMessage={errors.password?.message}
        />

        <Block row justifyStart mt={20}>
          {checked && (
            <Touchable
              mt={2}
              mr={8}
              width={18}
              height={18}
              borderRadius={4}
              bg={ColorsDefault.purple}
              onPress={onToggleChecked}
            />
          )}
          {!checked && (
            <IconSvg mr={8} mt={-1} xml={SvgDefault.checkbox} touchable onPress={onToggleChecked} />
          )}

          <Block row justifyStart middle wrap>
            <Text type='c2' fontWeight='medium' lineHeight={21}>
              I agree to the
            </Text>
            <Touchable ml={5} hitSlop={{ top: 20, bottom: 20 }} onPress={null}>
              <Text mt={0} type='c2' fontWeight='medium' color={ColorsDefault.textPurple}>
                Terms of Services
              </Text>
            </Touchable>
            <Text mt={2} ml={5} type='c2'>
              and
            </Text>
            <Touchable ml={5} hitSlop={{ top: 20, bottom: 20 }} onPress={null}>
              <Text mt={0} type='c2' fontWeight='medium' color={ColorsDefault.textPurple}>
                Privacy Policy.
              </Text>
            </Touchable>
          </Block>
        </Block>

        <Button mt={35} variant='primary' onPress={handleSubmit(onHandleSignUp)}>
          Create Account
        </Button>

        <Block row center middle mt={20}>
          <Text fontWeight='bold' lineHeight={21}>
            Have account?
          </Text>
          <Touchable
            ml={5}
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={goToSignInScreen}>
            <Text mt={2} fontWeight='bold' color={ColorsDefault.textPurple}>
              SIGN IN
            </Text>
          </Touchable>
        </Block>
      </Block>

      <CountriesModal
        visible={visible}
        onCloseModal={onCloseCountriesModal}
        country={country}
        setCountry={setCountry}
      />
    </Body>
  );
}

export default SignUpScreen;
