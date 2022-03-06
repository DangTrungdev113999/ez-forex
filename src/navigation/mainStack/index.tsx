import 'react-native-gesture-handler';
import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import * as screenTypes from '~/common/screenTypes';
import MainTab from './mainTab';
import SignalDetailStack from './SignalDetailStack';
import AlertDetailStack from './AlertDetailStack';
import AccountDetalStack from './AccountDetalStack';
import PackageStack from './PackageStack';
import EducationStack from './EducationStack';
import NotificationStack from './NotificationStack';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}>
      <Stack.Screen name={screenTypes.MainTab} component={MainTab} />
      <Stack.Screen name={screenTypes.SignalDetailStack} component={SignalDetailStack} />
      <Stack.Screen name={screenTypes.AlertDetailStack} component={AlertDetailStack} />
      <Stack.Screen name={screenTypes.AccountDetailStack} component={AccountDetalStack} />
      <Stack.Screen name={screenTypes.PackageStack} component={PackageStack} />
      <Stack.Screen name={screenTypes.EducationStack} component={EducationStack} />re
      <Stack.Screen name={screenTypes.NoticationStack} component={NotificationStack} />
    </Stack.Navigator>
  );
}

export default MainStack;
