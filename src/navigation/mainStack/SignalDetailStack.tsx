import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SignalDetailScreen from '~/screens/signal/SignalDetail';
import * as screenTypes from '~/common/screenTypes';
import { Block } from '~/components';
import { mainOptions } from '~/common';
import BackIcon from '~/components/header/BackIcon';
import ColorsDefault from '~/assets/colors';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.SignalDetailScreen}
      component={SignalDetailScreen}
      options={({ route }) => ({
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
  </Stack.Navigator>
);
