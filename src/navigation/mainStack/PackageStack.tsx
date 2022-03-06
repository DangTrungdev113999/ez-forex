import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PackageScreen from '~/screens/package/Package';

import * as screenTypes from '~/common/screenTypes';
import BackIcon from '~/components/header/BackIcon';
import { Block } from '~/components';
import { mainOptions } from '~/common';
import SvgDefault from '~/assets/svg';
import HeaderTitle from '~/components/header/HeaderTitle';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.PackageScreen}
      component={PackageScreen}
      options={() => ({
        headerTitle: () => <HeaderTitle xml={SvgDefault.premiumQuality} title='Package' />,
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
  </Stack.Navigator>
);
