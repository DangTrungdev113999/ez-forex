import React, { useState, memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import {
  Block,
  Gradient,
  IconSvg,
  List,
  Search,
  Touchable,
  Text,
  MyRefreshControl,
  AddBtn,
  DeleteBtn,
} from '~/components';

import * as screenTypes from '~/common/screenTypes';
import { useAppDispatch, useAppSelector, useHandleFetchData, useDynamicList } from '~/hook';
import PairItem from '../PairItem';
import ConfirmDeleteModal from '~/components/modal/ConfirmDeleteModal';
import { PAIR_ITEM_TYPE } from '~/common';
import { fetchWathlist, removeWathlist } from '~/modules/alert/slice';
import {
  fetchWathlistLoadingSelector,
  isTheFirstOpenAlertTabSelector,
  wathlistSelector,
} from '~/modules/alert/selectors';
import { PairItemType } from '~/modules/alert/model';
import WathListSkeleton from '~/components/skeleton/WatchListSkeleton';
import { NoData } from '~/components/noData';

function WatchListTab({ indexTab }: { indexTab: number }) {
  const [updateMode, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const wathlist = useAppSelector(state => wathlistSelector(state, searchText.trim()));
  const fetchWathlistLoading = useAppSelector(fetchWathlistLoadingSelector);
  const isTheFirstOpenAlertTab = useAppSelector(isTheFirstOpenAlertTabSelector);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchWathlist,
    isFocusScreen: false,
  });

  const {
    listPicked,
    onHandleListPicked,
    onIscheckedById,
    setList: setListPicked,
  } = useDynamicList({ initList: [] });

  const onCloseModal = () => setVisible(false);
  const onOpenModal = () => setVisible(true);

  const onToggleUpdateMode = () => {
    if (updateMode) {
      setListPicked([]);
      return setUpdate(false);
    }
    setUpdate(true);
  };

  const onHandleDelete = () => {
    onCloseModal();
    if (listPicked.length) {
      const watchLists = listPicked.map((item: PairItemType) => item.id).join(',');
      setTimeout(() => {
        dispatch(
          removeWathlist({
            data: {
              watchLists,
            },
            onSuccess: () => {
              onToggleUpdateMode();
            },
          }),
        );
      }, 500);
    }
  };

  const onGotoAddWathlistScreen = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.AddWathlistScreen,
        params: {
          fromScreen: screenTypes.AlertScreen,
        },
      } as never,
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: PairItemType }) => (
      <PairItem
        itemType={PAIR_ITEM_TYPE.PRIMARY as keyof typeof PAIR_ITEM_TYPE}
        item={item}
        updateMode={updateMode}
        checked={onIscheckedById(item as never)}
        onHandlePicked={onHandleListPicked as never}
      />
    ),
    [updateMode, listPicked],
  );

  return (
    <Block flex={1}>
      <Block row ph={20} pv={20} mb={4} bg={ColorsDefault.bgPrimary}>
        <Block flex={1} height={40}>
          {updateMode && (
            <DeleteBtn
              disabled={!listPicked?.length}
              width={40}
              height={40}
              bg={ColorsDefault.blue}
              onPress={onOpenModal}
            />
          )}
          {!updateMode && <Search value={searchText} onChangeText={setSearchText} />}
        </Block>

        <Touchable center middle ml={12} onPress={onToggleUpdateMode}>
          <Gradient
            width={44}
            height={44}
            borderRadius={12}
            flex={1}
            center
            middle
            colors={[ColorsDefault.gradientPrimaryStart, ColorsDefault.gradientPrimaryEnd]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <IconSvg xml={updateMode ? SvgDefault.clearIcon : SvgDefault.updateIcon} />
          </Gradient>
        </Touchable>
      </Block>

      {isTheFirstOpenAlertTab.watchlistTab && fetchWathlistLoading && <WathListSkeleton />}

      {!wathlist.length && searchText.length > 0 && !fetchWathlistLoading && <NoData mt={20} />}

      {!isTheFirstOpenAlertTab.watchlistTab && (
        <List
          flex={1}
          ph={20}
          mr={-8}
          data={wathlist}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            !isTheFirstOpenAlertTab.watchlistTab && (
              <MyRefreshControl
                refreshing={refreshLoading}
                onRefresh={() => onHandleFetchData(true)}
              />
            )
          }
        />
      )}

      {!updateMode && <AddBtn bg={ColorsDefault.pink} onPress={onGotoAddWathlistScreen} />}

      <ConfirmDeleteModal
        visible={visible}
        onCloseModal={onCloseModal}
        onHandleDelete={onHandleDelete}
        title='Delete this pair'
        content=' Are you sure to delete this pair?'
      />
    </Block>
  );
}

export default memo(WatchListTab);
