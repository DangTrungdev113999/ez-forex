import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SignalScreen from '~/screens/signal/Signal';

import * as screenTypes from '~/common/screenTypes';
import { forFade, mainOptions } from '~/common';
import GroupPrimaryIcon from '~/components/header/GroupPrimaryIcon';
import BrandHorizontal from '~/components/header/BrandHorizontal';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.SignalScreen}
      component={SignalScreen}
      options={() => ({
        title: '',
        headerLeft: () => <BrandHorizontal />,
        headerRight: () => <GroupPrimaryIcon />,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
        // animations: {
        //   push: {
        //     waitForRender: true,
        //   },
        // },
      })}
    />
  </Stack.Navigator>
);
