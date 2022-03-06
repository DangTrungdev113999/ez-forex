import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '~/hook';
import { useFocusScreen } from './useFocusScreen';

type ParamsType = {
  actionToDispatch: any;
  isFocusScreen?: boolean;
  conditionToFetch?: boolean;
  params?: Record<string, string>;
  onSuccess?: any;
  onError?: any;
};

export const useHandleFetchData = (
  {
    actionToDispatch,
    isFocusScreen = true,
    conditionToFetch = true,
    params = {},
    onSuccess,
    onError,
  }: ParamsType,
  depen: any[] = [],
) => {
  const [refreshLoading, setRefreshLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onHandleFetchData = (isRefreshing?: boolean) => {
    if (isRefreshing) {
      setRefreshLoading(true);
    }

    dispatch(
      actionToDispatch({
        data: params,
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          if (isRefreshing) {
            setRefreshLoading(false);
          }
        },
        onError: () => {
          if (onError) {
            onError();
          }
          if (isRefreshing) {
            setRefreshLoading(false);
          }
        },
      }),
    );
  };

  useFocusScreen(() => {
    if (isFocusScreen) {
      onHandleFetchData();
    }
  }, [navigation, ...depen]);

  useEffect(() => {
    if (!isFocusScreen && conditionToFetch) {
      onHandleFetchData();
    }
  }, [...depen]);

  return { onHandleFetchData, refreshLoading };
};
