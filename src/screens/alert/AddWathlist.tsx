import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import * as screenTypes from '~/common/screenTypes';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import {
  Block,
  Body,
  IconSvg,
  List,
  MyRefreshControl,
  Search,
  Text,
  Touchable,
} from '~/components';

import PairItem from './components/PairItem';
import { PAIR_ITEM_TYPE, ALL_WATH_LIST_SIZE } from '~/common';
import { useAppSelector, useDynamicList, useHandleFetchData, useNavigationSetOption } from '~/hook';
import {
  fetchAllWathlist,
  loadmoreAllWatchList,
  saveSubscribeAlert,
  updateWathlist,
} from '~/modules/alert/slice';
import { PairItemType } from '~/modules/alert/model';
import {
  fetchAllWathlistLoadingSelector,
  isTheFirstOpenAlertTabSelector,
  updateWathlistLoadingSelector,
  wathlistSelector,
  allWatchListSelector,
  loadmoreAllWatchListLoadingSelector,
  loadMoreAllWatchListNoMoreSelector,
} from '~/modules/alert/selectors';
import WathListSkeleton from '~/components/skeleton/WatchListSkeleton';
import { showToastInfo } from '~/utils';

type ParamList = {
  Detail: {
    fromScreen: string;
  };
};

type KeyOfPairItemtype = keyof typeof PAIR_ITEM_TYPE;

function AddWathlistScreen() {
  const [showPopularSearch, setShowPopularSearch] = useState<boolean>(true);

  const wathlist = useAppSelector(state => wathlistSelector(state, ''));
  const allWatchList = useAppSelector(allWatchListSelector);
  const fetchAllWathlistLoading = useAppSelector(fetchAllWathlistLoadingSelector);
  const isTheFirstOpenAlertTab = useAppSelector(isTheFirstOpenAlertTabSelector);
  const updateWathlistLoading = useAppSelector(updateWathlistLoadingSelector);
  const loadmoreAllWatchListLoading = useAppSelector(loadmoreAllWatchListLoadingSelector);
  const loadMoreAllWatchListNoMore = useAppSelector(loadMoreAllWatchListNoMoreSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  // fromScreen is AlertScreen or SubAlertScreen
  const { fromScreen } = route.params;

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchAllWathlist,
    isFocusScreen: false,
  });

  const { listPicked, onHandleListPicked, onIscheckedById, itemPicked, setItemPicked } =
    useDynamicList({ initList: [] });

  const onHandlePress = () => {
    if (
      (fromScreen === screenTypes.AlertScreen && !listPicked.length) ||
      (fromScreen === screenTypes.SubAlertScreen && !itemPicked?.id)
    ) {
      return showToastInfo({
        message: 'Please choose the pair!',
      });
    }

    if (fromScreen === screenTypes.AlertScreen) {
      const listPickedId = listPicked.map((item: PairItemType) => item.id).join(',');
      const wathlistId = wathlist.map((item: PairItemType) => item.id).join(',');
      dispatch(
        updateWathlist({
          data: {
            watchLists:
              `${wathlistId},${listPickedId}`.indexOf(',') === 0
                ? `${listPickedId}`
                : `${wathlistId},${listPickedId}`,
          },
          onSuccess: () => {
            navigation.goBack();
          },
        }),
      );
    } else if (fromScreen === screenTypes.SubAlertScreen) {
      dispatch(
        saveSubscribeAlert({
          pair: itemPicked,
        }),
      );
      navigation.goBack();
    }
  };

  useNavigationSetOption(
    {
      headerRight: () => (
        <IconSvg mr={24} touchable xml={SvgDefault.checkIcon} onPress={onHandlePress} />
      ),
    },
    [listPicked, itemPicked],
  );

  const onLoadMoreAllWatchlist = () => {
    dispatch(loadmoreAllWatchList({}));
  };

  const onTogglePopularSearch = () => setShowPopularSearch(prev => !prev);

  const renderPairItemPopular = ({ item }: { item: PairItemType }) => (
    <PairItem
      itemType={PAIR_ITEM_TYPE.SAMLL as KeyOfPairItemtype}
      item={item}
      checked={onIscheckedById(item as never)}
      onHandlePicked={fromScreen === screenTypes.AlertScreen ? onHandleListPicked : setItemPicked}
      fromScreen={fromScreen}
    />
  );

  const renderPairItem = ({ item }: { item: PairItemType }) => (
    <PairItem
      itemType={PAIR_ITEM_TYPE.SECONDARY as KeyOfPairItemtype}
      item={item}
      checked={onIscheckedById(item as never)}
      onHandlePicked={fromScreen === screenTypes.AlertScreen ? onHandleListPicked : setItemPicked}
      fromScreen={fromScreen}
    />
  );

  return (
    <Body
      bg={ColorsDefault.bgPrimary}
      loading={
        fromScreen === screenTypes.AlertScreen &&
        ((!isTheFirstOpenAlertTab.addWathlistScreen &&
          fetchAllWathlistLoading &&
          !refreshLoading) ||
          updateWathlistLoading)
      }>
      <Search mt={10} mh={20} />

      {isTheFirstOpenAlertTab.addWathlistScreen && fetchAllWathlistLoading && (
        <>
          <WathListSkeleton type={PAIR_ITEM_TYPE.SAMLL} />
          <WathListSkeleton type={PAIR_ITEM_TYPE.SECONDARY} />
        </>
      )}

      {!isTheFirstOpenAlertTab.addWathlistScreen && (
        <>
          <Touchable pt={20} ph={20} row middle justifyBetween onPress={onTogglePopularSearch}>
            <Text type='c1' fontWeight='medium'>
              Popular search
            </Text>
            <IconSvg xml={showPopularSearch ? SvgDefault.arrowDown : SvgDefault.arrowUp} />
          </Touchable>

          {showPopularSearch && (
            <List
              mh={10}
              data={[...allWatchList].splice(0, 9)}
              horizontal={false}
              numColumns={3}
              renderItem={renderPairItemPopular}
              scrollEnabled={false}
            />
          )}

          <Text mt={16} ml={20} mb={10} type='c1' fontWeight='medium'>
            {allWatchList?.length} symbols
          </Text>

          <Block width='100%' borderBottom />
          <List
            flex={1}
            data={allWatchList}
            renderItem={renderPairItem}
            onEndReachedThreshold={0.3}
            refreshControl={
              !isTheFirstOpenAlertTab.addWathlistScreen && (
                <MyRefreshControl
                  refreshing={refreshLoading}
                  onRefresh={() => onHandleFetchData(true)}
                />
              )
            }
            onEndReached={() => {
              if (
                !loadMoreAllWatchListNoMore &&
                !loadmoreAllWatchListLoading &&
                allWatchList.length >= ALL_WATH_LIST_SIZE
              ) {
                onLoadMoreAllWatchlist();
              }
            }}
            loadmoreLoading={() =>
              loadmoreAllWatchListLoading && (
                <WathListSkeleton numberOfItem={2} type={PAIR_ITEM_TYPE.SECONDARY} />
              )
            }
          />
        </>
      )}
    </Body>
  );
}

export default AddWathlistScreen;
