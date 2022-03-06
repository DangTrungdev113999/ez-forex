import React, { useState, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import * as screenTypes from '~/common/screenTypes';
import {
  Body,
  TimeFramesModal,
  Block,
  Button,
  IconSvg,
  Text,
  DeleteBtn,
  ToggleNotificationModal,
} from '~/components';
import SubAlertItem from './components/SubAlertItem';
import SvgDefault from '~/assets/svg';
import { useAppDispatch, useAppSelector } from '~/hook';
import {
  fetchConditions,
  fetchIndicators,
  fetchTimeFrames,
  removeAlertChannel,
  saveSubscribeAlert,
  updateDiscoverAlert,
} from '~/modules/alert/slice';
import {
  subscribeAlertDataSelector,
  conditionsSelector,
  indicatorsSelector,
  updateDiscoverAlertLoadingSelector,
  fetchConditionsLoadingSelector,
  fetchIndicatorsLoadingSelector,
  fetchTimeFramesLoadingSelector,
} from '~/modules/alert/selectors';
import { IndicatorItemType, ConditionItemType, PairItemType } from '~/modules/alert/model';
import { showToastError } from '~/utils';
import ColorsDefault from '~/assets/colors';

type ParamList = {
  Detail: {
    discoverItem: Record<string, any>;
    pairs?: Record<string, any>;
    updateAlert: boolean;
  };
};

function SubAlertScreen() {
  const [visible, setVisible] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [missPair, setMissPair] = useState(false);
  const [missTimeFrame, setMissTimeFrame] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const subscribeAlertData = useAppSelector(subscribeAlertDataSelector);
  const conditions = useAppSelector(conditionsSelector);
  const indicators = useAppSelector(indicatorsSelector);
  const updateDiscoverAlertLoading = useAppSelector(updateDiscoverAlertLoadingSelector);
  const fetchConditionsLoading = useAppSelector(fetchConditionsLoadingSelector);
  const fetchIndicatorsLoading = useAppSelector(fetchIndicatorsLoadingSelector);
  const fetchTimeFramesLoading = useAppSelector(fetchTimeFramesLoadingSelector);

  const { pair, timeFrame, indicatorAlert, conditionAlert } = subscribeAlertData;

  const { discoverItem, pairs: parisFromAlertChannel, updateAlert } = route.params;

  const onHandleFetchdata = () => {
    const methodId = discoverItem?.id;

    if (methodId) {
      const data = {
        methodId,
      };
      dispatch(
        fetchTimeFrames({
          data,
        }),
      );
      dispatch(
        fetchConditions({
          data,
        }),
      );
      dispatch(
        fetchIndicators({
          data,
        }),
      );
    }
  };

  useEffect(() => {
    onHandleFetchdata();
  }, []);

  useEffect(() => {
    dispatch(
      saveSubscribeAlert({
        pair: {},
        timeFrame: {},
        indicatorAlert: indicators,
        conditionAlert: conditions,
      }),
    );
  }, [discoverItem.id, indicators, conditions]);

  const onOpenModal = () => setVisible(true);
  const onCloseModal = () => setVisible(false);

  const onOpenConfirmModal = () => setVisibleConfirmModal(true);
  const onCloseConfirmModal = () => setVisibleConfirmModal(false);

  const onGotoAddWathlistScreen = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.AddWathlistScreen,
        params: {
          fromScreen: screenTypes.SubAlertScreen,
        },
      } as never,
    );
  };

  const onGotoIndicatorConfigScreen = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.IndicatorConfigScreen,
        params: {
          discoverItem,
        },
      } as never,
    );
  };

  const onGotoConditionScreen = () => {
    navigation.navigate(
      screenTypes.AlertDetailStack as never,
      {
        screen: screenTypes.ConditionScreen,
        params: {
          discoverItem,
        },
      } as never,
    );
  };

  const onHandleSubcribeAlert = () => {
    if (!pair?.id && !parisFromAlertChannel?.id) {
      showToastError({
        message: 'Please choose the pair!',
      });
      return setMissPair(true);
    }
    if (!timeFrame?.id && !updateAlert) {
      showToastError({
        message: 'Please choose the time frame!',
      });
      return setMissTimeFrame(true);
    }
    dispatch(
      updateDiscoverAlert({
        data: {
          pairId:
            parisFromAlertChannel?.subscribeDetail?.pairId || parisFromAlertChannel?.id || pair.id,
          methodId: discoverItem?.id,
          timeFrameId: timeFrame?.id || parisFromAlertChannel?.subscribeDetail?.timeFrameId,
          indicator: indicatorAlert.map((item: IndicatorItemType) => item.id).join([',']),
          conditionAlert: conditionAlert.map((item: ConditionItemType) => item.id).join([',']),
        },
        onSuccess: res => {
          if (res?.data?.length > 0) {
            res?.data.forEach((topic: string) => {
              messaging()
                .subscribeToTopic(topic)
                .then(() => console.log(`Subscribed to topic ${topic}!`));
            });
          }
          navigation.goBack();
        },
      }),
    );
  };

  const onRemoveAlertChannel = () => {
    dispatch(
      removeAlertChannel({
        data: {
          alertsId: parisFromAlertChannel?.id,
          pairsId: parisFromAlertChannel?.subscribeDetail?.pairId,
        },
        onSuccess: () => {
          onCloseConfirmModal();
          messaging()
            .unsubscribeFromTopic(parisFromAlertChannel?.topic || '')
            .then(() => console.log(`Un Subscribed to topic! ${parisFromAlertChannel?.topic}`));
        },
        onError: () => {
          onCloseConfirmModal();
        },
      }),
    );
  };

  return (
    <Body ph={24} pt={16} loading={updateDiscoverAlertLoading}>
      <Block flex={1}>
        <SubAlertItem
          icon={SvgDefault.dollar}
          name='Pair'
          textRight={parisFromAlertChannel?.pairs || pair?.pairs}
          error={!pair?.id && missPair}
          onPress={onGotoAddWathlistScreen}
          disabled={!!parisFromAlertChannel?.id}
        />
        <SubAlertItem
          icon={SvgDefault.alarm}
          name='Time-frame'
          textRight={parisFromAlertChannel?.timeFrame || timeFrame?.name}
          error={!timeFrame?.id && missTimeFrame}
          loading={fetchTimeFramesLoading}
          onPress={onOpenModal}
        />
        <SubAlertItem
          icon={SvgDefault.settings}
          name='Indicator config'
          textRight={
            indicatorAlert.length === indicators.length
              ? 'Default'
              : `${indicatorAlert.length}/${indicators.length}`
          }
          loading={fetchIndicatorsLoading}
          onPress={onGotoIndicatorConfigScreen}
        />
        <SubAlertItem
          icon={SvgDefault.notificationAlert}
          name='Condition (Alert when ...)'
          textRight={
            conditionAlert.length === conditions.length
              ? 'Default'
              : `${conditionAlert.length}/${conditions.length}`
          }
          loading={fetchConditionsLoading}
          onPress={onGotoConditionScreen}
        />
      </Block>

      <Block row>
        <Button flex={1} row mb={35} shadow variant='primary' onPress={onHandleSubcribeAlert}>
          <IconSvg xml={SvgDefault.notificationFill} />
          <Text fontWeight='bold'>{updateAlert ? 'Save' : 'Subcribe Alert'} </Text>
        </Button>
        {updateAlert && (
          <DeleteBtn
            ml={16}
            width={42}
            height={42}
            shadow
            bg={ColorsDefault.red}
            onPress={onOpenConfirmModal}
          />
        )}
      </Block>

      <TimeFramesModal visible={visible} onCloseModal={onCloseModal} />

      <ToggleNotificationModal
        visible={visibleConfirmModal}
        onCloseModal={onCloseConfirmModal}
        onHandleToggle={onRemoveAlertChannel}
        title='Delete this alert'
        content='Are you sure to start this alert?'
      />
    </Body>
  );
}

export default SubAlertScreen;
