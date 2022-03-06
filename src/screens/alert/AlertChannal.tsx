import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  Block,
  Body,
  Button,
  Text,
  Touchable,
  IconSvg,
  List,
  ConfirmDeleteModal,
  AddBtn,
  MyRefreshControl,
} from '~/components';
import { NoData } from '~/components/noData';
import * as screenTypes from '~/common/screenTypes';

import {
  useNavigationSetOption,
  useHandleFetchData,
  useAppSelector,
  useAppDispatch,
  useDynamicList,
} from '~/hook';
import SvgDefault from '~/assets/svg';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import AlertChannalItem from './components/AlertChannalItem';
import BottomTab from './components/BottomTab';
import {
  fetchAllAlert,
  fetchAllMethod,
  fetchAllTimeFrame,
  removeAlertChannel,
} from '~/modules/alert/slice';
import {
  allAlertSelector,
  fetchAllAlertLoadingSelector,
  removeAlertChannelLoadingSelector,
} from '~/modules/alert/selectors';

function AlertChannalScreen() {
  const [updateMode, setUpdateMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeFramePicked, setTimeFrame] = useState('All');
  const [methodPicked, setMethod] = useState('All');

  const alertsChannel = useAppSelector(allAlertSelector);
  const fetchAllAlertLoading = useAppSelector(fetchAllAlertLoadingSelector);
  const removeAlertChannelLoading = useAppSelector(removeAlertChannelLoadingSelector);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute();

  const { pairs } = route.params;

  useEffect(() => {
    dispatch(fetchAllTimeFrame({}));
    dispatch(fetchAllMethod({}));
  }, []);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData(
    {
      actionToDispatch: fetchAllAlert,
      isFocusScreen: false,
      params: {
        pairsId: pairs?.id,
        timeFrame: timeFramePicked,
        method: methodPicked,
      },
    },
    [pairs?.id, timeFramePicked, methodPicked],
  );

  const {
    listPicked,
    onHandleListPicked,
    onIscheckedById,
    setList: setListPicked,
  } = useDynamicList({
    initList: [],
  });

  const onCloseModal = () => setVisible(false);
  const onOpenModal = () => setVisible(true);
  const onHandleRemoveChannel = () => {
    if (!listPicked.length) {
      onCloseModal();
      return;
    }

    dispatch(
      removeAlertChannel({
        data: {
          alertsId: listPicked.map(item => item?.alertId).join(','),
          pairsId: pairs.id,
        },
        onSuccess: () => {
          onCloseModal();
          listPicked.forEach(item => {
            messaging()
              .unsubscribeFromTopic(item?.topic || '')
              .then(() => console.log('Un Subscribed to topic!'));
          });
        },
        onError: () => {
          onCloseModal();
        },
      }),
    );
  };

  useNavigationSetOption(
    {
      headerTitle: () => (
        <Block center middle>
          <Text type='h5'>{pairs?.pairs || ''}</Text>
          <Text mt={8} mb={10} fontSize={16} fontWeight='medium' color={ColorsDefault.textGrayDark}>
            {pairs?.price || 0}
          </Text>
        </Block>
      ),
      headerRight: () =>
        updateMode && (
          <Touchable
            mr={24}
            onPress={() =>
              setListPicked(listPicked.length === alertsChannel.length ? [] : alertsChannel)
            }>
            <Text type='c1' fontWeight='medium'>
              {listPicked.length === alertsChannel.length ? 'Clear All' : 'Select All'}
            </Text>
          </Touchable>
        ),
    },
    [updateMode, listPicked, alertsChannel],
  );

  const goToIndicatorAlerts = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.IndicatorAlertsScreen,
        params: {
          pairs,
        },
      } as never,
    );
  };

  const _renderItem = ({ item }) => (
    <AlertChannalItem
      updateMode={updateMode}
      pairs={pairs}
      alert={item}
      checked={onIscheckedById(item as never)}
      onHandleListPicked={onHandleListPicked}
    />
  );

  return (
    <Body ph={24} pb={66} loading={removeAlertChannelLoading}>
      {!alertsChannel.length && timeFramePicked === 'All' && methodPicked === 'All' && (
        <>
          <NoData
            mt={150}
            content={
              <Block center middle>
                <Text color={ColorsDefault.grayDark}>No Alert</Text>
                <Text type='c1' color={ColorsDefault.grayDark}>
                  Please add the first Alert!
                </Text>
              </Block>
            }
          />
          <Button
            width='100%'
            row
            mt={32}
            center
            middle
            shadow
            variant='primary'
            onPress={goToIndicatorAlerts}>
            <IconSvg xml={SvgDefault.addFill} />
            <Text ml={5} mt={4} fontWeight='bold'>
              Add Alert
            </Text>
          </Button>
        </>
      )}

      {!alertsChannel.length && (timeFramePicked !== 'All' || methodPicked !== 'All') && (
        <NoData mt={150} />
      )}

      <List
        flex={1}
        data={alertsChannel}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          !fetchAllAlertLoading && (
            <MyRefreshControl
              refreshing={refreshLoading}
              onRefresh={() => onHandleFetchData(true)}
            />
          )
        }
      />

      {updateMode && (
        <Block row ph={20} pb={25} absolute bottom={0} left={0} right={0}>
          <Button
            mr={8}
            flex={1}
            variant='secondary'
            borderColor={ColorsDefault.textWhite}
            bg={ColorsDefault.bgPrimary}
            onPress={() => setUpdateMode(false)}>
            <Text mt={2} type='c1' fontWeight='medium' color={ColorsDefault.textWhite}>
              Cancel
            </Text>
          </Button>

          <Button
            ml={10}
            flex={1}
            variant='secondary'
            borderColor={ColorsDefault.red}
            bg={ColorsDefault.red}
            onPress={onOpenModal}>
            <Block mr={4} row center middle>
              <IconSvg xml={SvgDefault.deletefill} />
              <Text mt={2} ml={4} type='c1' fontWeight='medium'>
                Delete
              </Text>
            </Block>
          </Button>
        </Block>
      )}

      {!updateMode && (
        <BottomTab
          updateMode={updateMode}
          setUpdateMode={setUpdateMode}
          timeFramePicked={timeFramePicked}
          setTimeFrame={setTimeFrame}
          methodPicked={methodPicked}
          setMethod={setMethod}
        />
      )}

      {!updateMode &&
        (timeFramePicked !== 'All' || methodPicked !== 'All' || alertsChannel.length > 0) && (
          <AddBtn bottom={100} bg={ColorsDefault.blue} onPress={goToIndicatorAlerts} />
        )}

      <ConfirmDeleteModal
        visible={visible}
        onCloseModal={onCloseModal}
        onHandleDelete={onHandleRemoveChannel}
        title='Delete this'
        content=' Are you sure to delete this?'
      />
    </Body>
  );
}

export default AlertChannalScreen;
