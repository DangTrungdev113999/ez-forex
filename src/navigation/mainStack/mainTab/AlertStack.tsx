import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import { mainOptions } from '~/common';
import BrandHorizontal from '~/components/header/BrandHorizontal';
import GroupPrimaryIcon from '~/components/header/GroupPrimaryIcon';
import AlertScreen from '~/screens/alert/Alert';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.AlertScreen}
      component={AlertScreen}
      options={() => ({
        title: '',
        headerLeft: () => <BrandHorizontal />,
        headerRight: () => <GroupPrimaryIcon />,
      })}
    />
  </Stack.Navigator>
);
