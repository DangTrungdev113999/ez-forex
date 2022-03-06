import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import UpdateAccountScreen from '~/screens/account/UpdateAccount';
import ChangePassWordScreen from '~/screens/account/ChangePassword';
import BackIcon from '~/components/header/BackIcon';
import { Block } from '~/components';
import { mainOptions } from '~/common';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.UpdateAccountScreen}
      component={UpdateAccountScreen}
      options={() => ({
        title: 'My Account',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.ChangePasswordScreen}
      component={ChangePassWordScreen}
      options={() => ({
        title: 'Change Password',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
  </Stack.Navigator>
);
