import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ColorsDefault from '~/assets/colors';
import { Block, Body, Gradient, Text, Touchable } from '~/components';

import DiscoverAlertTab from './components/alertTabs/DiscoverAlertTab';
import WatchListTab from './components/alertTabs/WatchListTab';
import { useAppSelector } from '~/hook';
import { removeWathlistLoadingSelector } from '~/modules/alert/selectors';

function AlertScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'WATCH_LIST', title: 'Watch List' },
    { key: 'DISCOVER_ALERT', title: 'Discover Alert' },
  ]);

  const removeWathlistLoading = useAppSelector(removeWathlistLoadingSelector);

  const layout = useWindowDimensions();

  const renderScene = SceneMap({
    WATCH_LIST: () => <WatchListTab indexTab={index} />,
    DISCOVER_ALERT: () => <DiscoverAlertTab indexTab={index} />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: ColorsDefault.pink }}
      renderTabBarItem={({ route, navigationState, key, ...rest }) => {
        const focus = navigationState.routes[navigationState.index].key === key;
        return (
          <Touchable key={key} flex={1} center {...rest} activeOpacity={1}>
            <Gradient
              colors={[
                focus ? ColorsDefault.gradientPrimaryStart : ColorsDefault.bgPrimary,
                focus ? ColorsDefault.gradientPrimaryEnd : ColorsDefault.bgPrimary,
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              pv={12}>
              <Text
                color={focus ? ColorsDefault.textWhite : ColorsDefault.textGrayDark}
                fontWeight='bold'
                textCenter>
                {route.title}
              </Text>
            </Gradient>
            <Block height={1} bg={focus ? ColorsDefault.pink : ColorsDefault.gray} />
          </Touchable>
        );
      }}
      style={{
        backgroundColor: ColorsDefault.bgPrimary,
        elevation: 0,
        shadowOffset: 0,
        shadowColor: 'tranparent',
      }}
    />
  );

  return (
    <Body loading={removeWathlistLoading}>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </Body>
  );
}

export default AlertScreen;
