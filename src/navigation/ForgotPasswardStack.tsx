import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';

const SomethingScreen = () => <></>;

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name={screenTypes.ForgotPasswordScreem} component={SomethingScreen} />
  </Stack.Navigator>
);
