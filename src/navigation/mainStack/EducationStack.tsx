import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import * as screenTypes from '~/common/screenTypes';
import EducationScreen from '~/screens/education/Education';
import { forFade, mainOptions } from '~/common';
import SvgDefault from '~/assets/svg';
import HeaderTitle from '~/components/header/HeaderTitle';
import { Block } from '~/components';
import EducationVideoScreen from '~/screens/education/EducationVideo';
import BackIcon from '~/components/header/BackIcon';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name={screenTypes.EducationScreen}
      component={EducationScreen}
      options={() => ({
        headerTitle: () => <HeaderTitle xml={SvgDefault.book} title='Education' />,
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
      })}
    />
    <Stack.Screen
      name={screenTypes.EducationVideoScreen}
      component={EducationVideoScreen}
      options={({ route }) => ({
        headerTitle: () => (
          <HeaderTitle
            xml={route.params?.headerIcon}
            title={route.params?.headerTitle}
            iconWidth={24}
            iconHeight={24}
          />
        ),
        headerLeft: () => <BackIcon />,
        headerRight: () => <Block />,
        cardStyleInterpolator: forFade,
      })}
    />
  </Stack.Navigator>
);
