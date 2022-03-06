import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as screenTypes from '~/common/screenTypes';

import SignalStack from './SignalStack';
import HistoryStack from './HistoryStack';
import AlertStack from './AlertStack';
import AccountStack from './AccountStack';
import { Block, IconSvg, Text, Touchable } from '~/components';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';

const BottomTab = createBottomTabNavigator();

const CusomTabBottom = ({ state, descriptors, navigation }) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation1 = useRef(new Animated.Value(1)).current;

  return (
    <Block height={66} row alignItemsStart bg={ColorsDefault.bgPrimary} shadow>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const startAnimation = () => {
          Animated.sequence([
            Animated.delay(10),
            Animated.timing(scaleAnimation, {
              toValue: 1.2,
              duration: 100,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
            Animated.timing(scaleAnimation, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
              easing: Easing.elastic(4),
            }),
          ]).start();
        };

        const onPress = () => {
          startAnimation();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          startAnimation();

          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getTabInfo = () => {
          switch (route.name) {
            case screenTypes.SignalTab:
              return {
                tabName: 'SIGNAL',
                tabIcon: SvgDefault.signalTab,
                tabIconActive: SvgDefault.signalTabActive,
                tabKey: 'SignalTab',
              };
            case screenTypes.HistoryTab:
              return {
                tabName: 'HISTORY',
                tabIcon: SvgDefault.historyTab,
                tabIconActive: SvgDefault.historyTabActive,
              };
            case screenTypes.AlertTab:
              return {
                tabName: 'ALERT',
                tabIcon: SvgDefault.alertTab,
                tabIconActive: SvgDefault.alertTabActive,
                tabKey: 'AlertTab',
              };
            case screenTypes.AccountTab:
              return {
                tabName: 'ACCOUNT',
                tabIcon: SvgDefault.accountTab,
                tabIconActive: SvgDefault.accountTabActive,
              };

            default:
              return {
                tabName: 'SIGNAL',
                tabIcon: SvgDefault.signalTab,
                tabIconActive: SvgDefault.signalTabActive,
              };
          }
        };

        return (
          <Touchable
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            flex={1}
            mt={getTabInfo().tabName === 'ALERT' ? 6 : 8}
            center
            middle
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            animation
            style={{
              transform: [
                {
                  scale: isFocused ? scaleAnimation : 1,
                },
              ],
            }}>
            <Block circle={4} bg={isFocused ? ColorsDefault.textPink : ColorsDefault.bgPrimary} />
            <IconSvg
              mt={5}
              mb={getTabInfo().tabName === 'ALERT' ? -3 : 0}
              xml={isFocused ? getTabInfo().tabIconActive : getTabInfo().tabIcon}
            />

            <Text
              mt={5}
              type='c2'
              color={isFocused ? ColorsDefault.textPink : ColorsDefault.textGrayDark}>
              {getTabInfo().tabName}
            </Text>
          </Touchable>
        );
      })}
    </Block>
  );
};

function BottomTabs() {
  return (
    <BottomTab.Navigator
      tabBar={props => <CusomTabBottom {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen name={screenTypes.SignalTab} component={SignalStack} />
      <BottomTab.Screen name={screenTypes.HistoryTab} component={HistoryStack} />
      <BottomTab.Screen name={screenTypes.AlertTab} component={AlertStack} />
      <BottomTab.Screen name={screenTypes.AccountTab} component={AccountStack} />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;
