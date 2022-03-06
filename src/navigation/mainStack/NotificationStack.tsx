import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import NotificationScreen from '~/screens/notification/Notification';
import NotificationDetailScreen from '~/screens/notification/NotificationDetail';
import BackIcon from '~/components/header/BackIcon';
import { Block } from '~/components';
import { forFade, mainOptions } from '~/common';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.NoticationScreen}
      component={NotificationScreen}
      options={() => ({
        title: 'Notification',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.NoticationDetailScreen}
      component={NotificationDetailScreen}
      options={({ route }) => ({
        title: route.params?.headerTitle || 'Admin Notification',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      })}
    />
  </Stack.Navigator>
);
