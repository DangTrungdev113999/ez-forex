import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Linking, Alert } from 'react-native';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import ColorsDefault from '~/assets/colors';
import images from '~/assets/images';
import SvgDefault from '~/assets/svg';
import {
  Block,
  Body,
  Button,
  IconSvg,
  Image,
  ImageBackground,
  Text,
  Touchable,
} from '~/components';

import * as screenTypes from '~/common/screenTypes';
import { logOut } from '~/modules/auth/slice';
import { useAppDispatch } from '~/hook';
import { userInfoSelector } from '../../modules/account/selectors';

import { PACKAGGE_NAME } from '~/common';

const MAP_PACKAGGE_NAME_TO_BG_COLOR = {
  ROLE_FREE_USER: ColorsDefault.bgPrimary,
  PACKAGGE_NAME: ColorsDefault.card1GradientEnd,
  ROLE_PREMIUM_USER: ColorsDefault.card2GradientEnd,
  ROLE_GOLD_USER: ColorsDefault.card3GradientEnd,
};

function AccountScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userInfo = useSelector(userInfoSelector);

  const goToSignalDetailScreen = (screen: string) => {
    navigation.navigate(
      screenTypes.AccountDetailStack as never,
      {
        screen,
      } as never,
    );
  };

  const onOpenTelegram = () => {
    Linking.openURL('https://telegram.me/MingLeez');
  };

  const onShareApp = () => {
    const options = {
      message: 'Dowmload Ezforex app at',
      url: 'https://ezforex.page.link/muUh',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const onGotoPackage = () => {
    navigation.navigate(
      screenTypes.PackageStack as never,
      {
        screen: screenTypes.PackageScreen,
      } as never,
    );
  };

  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(logOut()) },
    ]);
  };

  return (
    <Body p={24} scroll>
      <Block row middle shadow>
        <Image defaultImage={images.defaultAvatar} source={images.defaultAvatar} circle={48} />
        <Block flex={1} ml={12}>
          <Block row middle>
            <Text uppercase type='h5' fontWeight='medium'>
              {userInfo?.username || ''}
            </Text>
            <Block
              ml={12}
              ph={8}
              pv={3}
              mb={4}
              bg={MAP_PACKAGGE_NAME_TO_BG_COLOR[userInfo?.packageName]}
              borderRadius={4}>
              <Text mt={2} type='c1' color={ColorsDefault.grayDark} fontWeight='medium'>
                {PACKAGGE_NAME[userInfo?.packageName as keyof typeof PACKAGGE_NAME] || ''}
              </Text>
            </Block>
          </Block>
          <Text type='c1' color={ColorsDefault.textGrayDark}>
            {userInfo?.email || ''}
          </Text>
        </Block>
        <IconSvg touchable xml={SvgDefault.exitIcon} onPress={onLogout} />
      </Block>

      <ImageBackground
        mt={25}
        height={164}
        middle
        source={images.cardBg}
        borderRadius={12}
        style={{ overflow: 'hidden' }}>
        <IconSvg mv={12} xml={SvgDefault.premiumQuality} iconWidth={35} iconHeight={35} />
        <Text type='h3' fontWeight='bold'>
          Create your own limits
        </Text>
        <Text>Gain access to more resources</Text>

        <Button
          mt={12}
          variant='secondary'
          bg={ColorsDefault.btnSecondary2}
          onPress={onGotoPackage}>
          GO PREMIUM
        </Button>
      </ImageBackground>

      <Touchable
        mt={12}
        ph={20}
        pv={15}
        row
        middle
        shadow
        borderRadius={12}
        bg={ColorsDefault.bgPrimary}
        onPress={() => goToSignalDetailScreen(screenTypes.UpdateAccountScreen)}>
        <IconSvg xml={SvgDefault.userIcon} />
        <Text ml={16}>My Account</Text>
      </Touchable>

      <Touchable
        mt={10}
        ph={20}
        pv={15}
        row
        middle
        shadow
        borderRadius={12}
        bg={ColorsDefault.bgPrimary}
        onPress={() => goToSignalDetailScreen(screenTypes.ChangePasswordScreen)}>
        <IconSvg xml={SvgDefault.passwrodIcon} />
        <Text ml={16} mt={2}>
          Change Password
        </Text>
      </Touchable>

      <Touchable
        mt={10}
        ph={20}
        pv={15}
        row
        middle
        shadow
        borderRadius={12}
        bg={ColorsDefault.bgPrimary}
        onPress={onShareApp}>
        <Image source={images.share} circle={25} />
        <Text ml={16}>Share app</Text>
      </Touchable>

      <Touchable
        mt={10}
        ph={20}
        pv={15}
        row
        middle
        shadow
        borderRadius={12}
        bg={ColorsDefault.bgPrimary}
        onPress={onOpenTelegram}>
        <Image source={images.telegram} circle={25} />
        <Text ml={16}>Contact us with Telegram</Text>
      </Touchable>
    </Body>
  );
}

export default AccountScreen;
