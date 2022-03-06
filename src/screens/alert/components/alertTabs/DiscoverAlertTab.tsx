import React, { memo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import ColorsDefault from '~/assets/colors';
import { Block, CommonSkeleton, IconSvg, Loading, MyRefreshControl, Search, Text, Touchable } from '~/components';

import * as screenTypes from '~/common/screenTypes';
import { useAppSelector, useDebounce, useHandleFetchData } from '~/hook';
import { fetchDiscoverAlert } from '~/modules/alert/slice';
import { discoverAlertSelector, discoverAlertTypeSelector, fetchDiscoverAlertLoadingSelector, isTheFirstOpenAlertTabSelector } from '~/modules/alert/selectors';
import { DiscoverAlertItem, PairItemType } from '~/modules/alert/model';
import SvgDefault from '~/assets/svg';


const MAP_ITEM_TO_KEY = {
  Ichimoku: 'ICMK',
  'Relative Strength Index (RSI)': 'RSI',
  'Stockchastic RSI': 'Stoch RSI',
  'Commodity Channel Index (CCI)': 'CCI',
  'Doji & Spinning Top': 'PA',
  'Relative Strength Index (RSI)': 'RSI',
}

const MAP_ITEM_TO_COLOR = {
  Ichimoku: '#FC3271',
  'Relative Strength Index (RSI)': '#7666FF',
  'Stockchastic RSI': '#4A23EB',
  'Commodity Channel Index (CCI)': '#FD5900',
  'Doji & Spinning Top': '#039E2F',
  'Relative Strength Index (RSI)': '#7666FF',
}

function DiscoverAlertTab({ indexTab, pairs }: { indexTab: number; pairs: PairItemType}) {

  const [discoverAlertType, setTypeName] = useState('All');
  const [searchText, setSearchText] = useState('');

  const debouncedValueSearch = useDebounce(searchText, 300);

  const discoverAlert = useAppSelector(state =>  discoverAlertSelector(state, discoverAlertType));
  const discoverAlertTypes = useAppSelector(discoverAlertTypeSelector);
  const fetchDiscoverAlertLoading = useAppSelector(fetchDiscoverAlertLoadingSelector);
  const isTheFirstOpenAlertTab = useAppSelector(isTheFirstOpenAlertTabSelector);


  const navigation = useNavigation();


  const onSetTypeName = (item: string) => setTypeName(item);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchDiscoverAlert,
    isFocusScreen: false,
    conditionToFetch: indexTab === 1,
  }, [indexTab, debouncedValueSearch]);



  const goToSubAlertScreen = (item: DiscoverAlertItem) => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.SubAlertScreen,
        params: {
          headerTitle: item.name,
          discoverItem: item,
          pairs
        },
      } as never,
    );
  };
  

  return (
    <Block flex={1}>
      <Block ph={20} pv={16} bg={ColorsDefault.bgPrimary}>
        <Search value={searchText} onChangeText={setSearchText} />

        <Block mt={15} row wrap>
          {discoverAlertTypes.map((typeName: string, index: number) => (
            <Touchable
              key={index.toString()}
              width={100}
              height={32}
              center
              middle
              onPress={() => onSetTypeName(typeName)}
              borderWidth={1}
              borderColor={typeName === discoverAlertType ? ColorsDefault.pink : ColorsDefault.bgPrimary}
              borderRadius={10}>
              <Text
                type='c2'
                color={typeName === discoverAlertType  ? ColorsDefault.textPink : ColorsDefault.textGrayDark}>
                {typeName}
              </Text>
            </Touchable>
          ))}
        </Block>
      </Block>

      {searchText.length > 0 && fetchDiscoverAlertLoading && <Loading mt={20}/>}

      <ScrollView
        refreshControl={
          !isTheFirstOpenAlertTab.discoverTab &&
          <MyRefreshControl
            refreshing={refreshLoading}
            onRefresh={() => onHandleFetchData(true)}
          />
      }>
        {!Object.keys(discoverAlert).length && searchText.length  > 0 && !fetchDiscoverAlertLoading &&
          <Block mt={20}>
            <Text textCenter>No data</Text>
          </Block>
        }

        {isTheFirstOpenAlertTab.discoverTab && <CommonSkeleton/>}

        {!isTheFirstOpenAlertTab.discoverTab && Object.keys(discoverAlert).map(type => (
          <Block ph={20} key={type}>
            <Text mt={24} fontWeight='semiBold' capitalize>
              {type}
            </Text>
            {discoverAlert[type]
              ?.map((item: DiscoverAlertItem) => (
                <Touchable mt={16} row middle key={item.id} onPress={() => goToSubAlertScreen(item)}>
                  {item?.icon && <IconSvg uri={item?.icon} />}
                  {!item.icon && (
                    <Block width={76} height={63} borderRadius={12} center middle bg={MAP_ITEM_TO_COLOR[item.name]}>
                      <Text fontWeight="bold">{MAP_ITEM_TO_KEY[item.name]}</Text>
                    </Block>
                  )}
                  <Block ml={16}>
                    <Text mt={5} fontWeight='medium'>{item.name}</Text>
                    <Text mt={8} type='c1' fontWeight='medium' color={ColorsDefault.pink}>
                      Alert Now >
                    </Text>
                  </Block>
                </Touchable>
              ))}
          </Block>
        ))}
      </ScrollView>
    </Block>
  );
}

export default memo(DiscoverAlertTab) ;
