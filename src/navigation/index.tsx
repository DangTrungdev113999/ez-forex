/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import * as screenTypes from '~/common/screenTypes';

import MainStack from './mainStack';
import AuthStack from './AuthStack';
import ForgotPasswardStack from './ForgotPasswardStack';
import { tokenSelector } from '~/modules/auth/selectors';

import ColorsDefault from '~/assets/colors';
import { Easing } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const token = useSelector(tokenSelector);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);

  return (
    <NavigationContainer theme={{ colors: { background: ColorsDefault.bgBody } }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        }}>
        {token ? (
          <Stack.Screen name={screenTypes.MainStack} component={MainStack} />
        ) : (
          <Stack.Screen name={screenTypes.AuthStack} component={AuthStack} />
        )}
        <Stack.Screen name={screenTypes.ForgotPasswordStack} component={ForgotPasswardStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
