import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import HistoryScreen from '~/screens/history/History';
import { mainOptions } from '~/common';
import BrandHorizontal from '~/components/header/BrandHorizontal';
import GroupPrimaryIcon from '~/components/header/GroupPrimaryIcon';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.HistoryScreen}
      component={HistoryScreen}
      options={() => ({
        title: '',
        headerLeft: () => <BrandHorizontal />,
        headerRight: () => <GroupPrimaryIcon />,
      })}
    />
  </Stack.Navigator>
);
