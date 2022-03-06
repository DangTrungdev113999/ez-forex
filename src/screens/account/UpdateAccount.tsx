import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SvgDefault from '~/assets/svg';
import { Body, Email, IconSvg, Input, Text, Touchable } from '~/components';
import { useAppDispatch, useAppSelector, useNavigationSetOption } from '~/hook';
import { updateUserInfo } from '~/modules/account/slice';
import { updateUserInfoLoadingSelector, userInfoSelector } from '~/modules/account/selectors';
import { schemaUpdatePhone } from '~/modules/account/validations';
import ColorsDefault from '~/assets/colors';

type DataType = {
  phone: string;
};

function UpdateAccountScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(updateUserInfoLoadingSelector);
  const userInfo = useAppSelector(userInfoSelector);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaUpdatePhone),
    defaultValues: {
      phone: userInfo.phone,
    },
  });

  const onHandUpdateAccout = (data: DataType) => {
    dispatch(
      updateUserInfo({
        data: {
          phone: data.phone || '',
        },
        onSuccess: () => {
          navigation.goBack();
        },
      }),
    );
  };

  useNavigationSetOption({
    headerRight: () => (
      <IconSvg
        mr={24}
        touchable
        xml={SvgDefault.checkIcon}
        onPress={handleSubmit(onHandUpdateAccout)}
      />
    ),
  });

  return (
    <Body p={24} loading={loading}>
      <Input
        mt={24}
        label='Username'
        placeholder='Enter username'
        disabled
        value={userInfo.username}
      />
      <Email mt={15} label='Email' disabled value={userInfo.email} />
      <Text mt={15} type='c1' fontWeight='medium' mb={10} ml={4}>
        Country
      </Text>
      <Touchable
        height={44}
        center
        pl={16}
        bg={ColorsDefault.bgPrimary}
        borderRadius={12}
        borderWidth={1}
        borderColor={ColorsDefault.textGrayDark}
        disabled>
        <Text type='c1' color={ColorsDefault.gray} fontWeight='medium'>
          {userInfo?.country || 'Viet nam'}
        </Text>
      </Touchable>
      <Input
        mt={15}
        label='Phone Number'
        placeholder='Enter your phone number'
        name='phone'
        control={control}
        keyboardType='numeric'
        error={errors.phone}
        errorMessage={errors.phone?.message}
      />
    </Body>
  );
}

export default UpdateAccountScreen;
