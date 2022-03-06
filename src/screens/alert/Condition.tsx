import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Body, List, IconSvg, MyRefreshControl } from '~/components';

import { useAppDispatch, useAppSelector, useDynamicList, useNavigationSetOption } from '~/hook';
import {
  conditionsSelector,
  fetchConditionsLoadingSelector,
  subscribeAlertDataSelector,
} from '~/modules/alert/selectors';
import ConditionItem from './components/ConditionItem';
import { fetchConditions, saveSubscribeAlert } from '~/modules/alert/slice';
import SvgDefault from '~/assets/svg';
import { DiscoverAlertItem } from '~/modules/alert/model';

type ParamList = {
  Detail: {
    discoverItem: Record<string, any>;
  };
};

function ConditionScreen() {
  const conditions = useAppSelector(conditionsSelector);
  const subscribeAlertData = useAppSelector(subscribeAlertDataSelector);
  const fetchConditionsLoading = useAppSelector(fetchConditionsLoadingSelector);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ParamList, 'Detail'>>();

  const { discoverItem } = route.params;

  const { conditionAlert } = subscribeAlertData;

  const { listPicked, onHandleListPicked, onIscheckedById } = useDynamicList({
    initList: conditionAlert,
  });

  const onHandlePress = () => {
    dispatch(
      saveSubscribeAlert({
        conditionAlert: listPicked,
      }),
    );
    navigation.goBack();
  };

  useNavigationSetOption(
    {
      headerRight: () => (
        <IconSvg mr={24} touchable xml={SvgDefault.checkIcon} onPress={onHandlePress} />
      ),
    },
    [listPicked],
  );

  const onHandleFetchdata = () => {
    dispatch(
      fetchConditions({
        data: {
          methodId: discoverItem?.id,
        },
        onSuccess: (items: DiscoverAlertItem) => {
          dispatch(
            saveSubscribeAlert({
              conditionAlert: items,
            }),
          );
        },
      }),
    );
  };

  return (
    <Body loading={false}>
      <List
        flex={1}
        mt={25}
        data={conditions}
        renderItem={({ item }) => (
          <ConditionItem
            item={item}
            onHandleListPicked={onHandleListPicked}
            onIscheckedById={onIscheckedById}
          />
        )}
        refreshControl={
          <MyRefreshControl
            refreshing={fetchConditionsLoading}
            onRefresh={() => onHandleFetchdata()}
          />
        }
      />
    </Body>
  );
}

export default ConditionScreen;
