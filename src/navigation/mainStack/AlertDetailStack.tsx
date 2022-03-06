import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AddWathlistScreen from '~/screens/alert/AddWathlist';

import * as screenTypes from '~/common/screenTypes';
import { BackIcon, Block } from '~/components';
import { mainOptions } from '~/common';
import CloseIcon from '~/components/header/CloseIcon';
import SubAlertScreen from '~/screens/alert/SubAlert';
import IndicatorConfigScreen from '~/screens/alert/IndicatorConfig';
import ConditionScreen from '~/screens/alert/Condition';
import AlertChannalScreen from '~/screens/alert/AlertChannal';
import IndicatorAlertsScreen from '~/screens/alert/IndicatorAlerts';
import AlertHistorysScreen from '~/screens/alert/AlertHistory';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      ...mainOptions,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    }}>
    <Stack.Screen
      name={screenTypes.SubAlertScreen}
      component={SubAlertScreen}
      options={({ route }) => ({
        headerTitle: route.params?.headerTitle,
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      })}
    />
    <Stack.Screen
      name={screenTypes.AddWathlistScreen}
      component={AddWathlistScreen}
      options={() => ({
        headerTitle: 'Search',
        headerLeft: () => <CloseIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.IndicatorConfigScreen}
      component={IndicatorConfigScreen}
      options={() => ({
        headerTitle: 'Indicator config',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.ConditionScreen}
      component={ConditionScreen}
      options={() => ({
        headerTitle: 'Condition (Alert when ...)',
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.AlertChannelScreen}
      component={AlertChannalScreen}
      options={() => ({
        headerLeft: () => <BackIcon />,
        headerTitleAlign: 'center',
      })}
    />
    <Stack.Screen
      name={screenTypes.IndicatorAlertsScreen}
      component={IndicatorAlertsScreen}
      options={() => ({
        title: 'Choose indicator alerts',
        headerLeft: () => <BackIcon />,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      })}
    />
    <Stack.Screen
      name={screenTypes.AlertHistoryScreen}
      component={AlertHistorysScreen}
      options={() => ({
        title: 'Choose indicator alerts',
        headerLeft: () => <BackIcon />,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      })}
    />
  </Stack.Navigator>
);
