import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import AccountScreen from '~/screens/account/Account';
import BrandHorizontal from '~/components/header/BrandHorizontal';
import GroupPrimaryIcon from '~/components/header/GroupPrimaryIcon';
import { mainOptions } from '~/common';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.AccountScreen}
      component={AccountScreen}
      options={() => ({
        title: '',
        headerLeft: () => <BrandHorizontal />,
        headerRight: () => <GroupPrimaryIcon />,
      })}
    />
  </Stack.Navigator>
);
