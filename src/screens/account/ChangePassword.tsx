import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Body, IconSvg, Password } from '~/components';
import { useAppDispatch, useAppSelector, useNavigationSetOption } from '~/hook';
import { changePassword } from '~/modules/account/slice';
import { schemaChangePassWord } from '~/modules/account/validations';

import SvgDefault from '~/assets/svg';
import { changePasswordLoadingSelector } from '~/modules/account/selectors';

type DataType = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

function ChangePassWordScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(changePasswordLoadingSelector);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaChangePassWord),
  });

  const onHandleChangePassword = (data: DataType) => {
    dispatch(
      changePassword({
        data,
        onSuccess: () => {
          navigation.goBack();
        },
      }),
    );
  };

  useNavigationSetOption(
    {
      headerRight: () => (
        <IconSvg
          mr={24}
          touchable
          xml={SvgDefault.checkIcon}
          onPress={handleSubmit(onHandleChangePassword)}
        />
      ),
    },
    [],
  );

  return (
    <Body p={24} loading={loading}>
      <Password
        label='Current Password'
        placeholder='Enter current password'
        name='currentPassword'
        control={control}
        error={errors.currentPassword}
        errorMessage={errors.currentPassword?.message}
      />

      <Password
        mt={15}
        label='New Password'
        placeholder='Enter new password'
        name='newPassword'
        control={control}
        error={errors.newPassword}
        errorMessage={errors.newPassword?.message}
      />

      <Password
        mt={15}
        label='Re-type Password'
        placeholder='Re-type Password'
        name='passwordConfirm'
        control={control}
        error={errors.passwordConfirm}
        errorMessage={errors.passwordConfirm?.message}
      />
    </Body>
  );
}

export default ChangePassWordScreen;
