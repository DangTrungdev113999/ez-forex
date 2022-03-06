import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import LoginScreen from '~/screens/auth/Login';
import SignUpScreen from '~/screens/auth/SignUp';
import { forFade } from '~/common';
import { Easing } from 'react-native';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    }}>
    <Stack.Screen name={screenTypes.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={screenTypes.SignUpScreen} component={SignUpScreen} />
  </Stack.Navigator>
);
