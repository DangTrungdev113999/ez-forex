import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core';
import ColorsDefault from '~/assets/colors';
import { Body, Touchable, Text, List, Block, MyRefreshControl } from '~/components';

import { useAppDispatch, useAppSelector } from '~/hook';
import { fetchIndicators, saveSubscribeAlert } from '~/modules/alert/slice';
import {
  fetchIndicatorsLoadingSelector,
  indicatorsSelector,
  subscribeAlertDataSelector,
} from '~/modules/alert/selectors';
import { IndicatorItemType } from '~/modules/alert/model';

type ParamList = {
  Detail: {
    discoverItem: Record<string, any>;
  };
};

function IndicatorConfigScreen() {
  const indicators = useAppSelector(indicatorsSelector);
  const fetchIndicatorsLoading = useAppSelector(fetchIndicatorsLoadingSelector);

  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const { discoverItem } = route.params;

  const onHandleFetchdata = () => {
    dispatch(
      fetchIndicators({
        data: {
          methodId: discoverItem?.id,
        },
        onSuccess: (items: IndicatorItemType) => {
          dispatch(
            saveSubscribeAlert({
              indicatorAlert: items,
            }),
          );
        },
      }),
    );
  };

  const renderItem = ({ item }: { item: IndicatorItemType }) => (
    <Block
      mt={8}
      mh={24}
      p={16}
      row
      justifyBetween
      middle
      borderRadius={12}
      bg={ColorsDefault.bgPrimary}>
      <Block row middle>
        <Text>{item?.name}</Text>
      </Block>
      <Text>{item?.pivot}</Text>
    </Block>
  );

  return (
    <Body pt={16} loading={false}>
      <List
        flex={1}
        data={indicators}
        renderItem={renderItem}
        refreshControl={
          <MyRefreshControl
            refreshing={fetchIndicatorsLoading}
            onRefresh={() => onHandleFetchdata()}
          />
        }
      />
    </Body>
  );
}

export default IndicatorConfigScreen;
