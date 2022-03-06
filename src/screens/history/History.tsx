import React, { useState, useEffect } from 'react';
import { Body, Text, List, CommonSkeleton, MyRefreshControl } from '~/components';
import Summary from './components/Summary';
import HistoryItem from './components/HistoryItem';
import { useAppSelector, useHandleFetchData } from '~/hook';
import { fetchHistories } from '~/modules/history/slice';
import { historiesSelector, isTheFirstOpenHistorySelecter } from '~/modules/history/selectors';
import ColorsDefault from '~/assets/colors';
import { baseApi } from '~/common/baseApi';
import { NoData } from '~/components/noData';

type SignalReportType = {
  pips: string;
  trades: string;
  rates: string;
};

function HistoryScreen() {
  // ============== Handle for Summary component =====================
  const [data, setData] = useState<SignalReportType>({});
  const onFetchSignalReport = async () => {
    try {
      const result = await baseApi.getApi('/signals/report');
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onFetchSignalReport();
  }, []);

  // ===================================

  const histories = useAppSelector(historiesSelector);
  const isTheFirstOpenHistory = useAppSelector(isTheFirstOpenHistorySelecter);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchHistories,
  });

  return (
    <Body>
      <Summary data={data} />

      {isTheFirstOpenHistory && <CommonSkeleton />}

      {!isTheFirstOpenHistory && !Object.entries(histories).length && <NoData mt={150} />}

      {!isTheFirstOpenHistory && Object.entries(histories).length > 0 && (
        <List
          flex={1}
          data={Object.entries(histories)}
          keyExtractor={item => item[0]}
          renderItem={({ item }) => (
            <>
              <Text mh={22} mt={16} type='c1' fontWeight='bold' color={ColorsDefault.textGrayDark}>
                {item[0]}
              </Text>
              {item[1].map(history => (
                <HistoryItem historyItem={history} key={history.id} />
              ))}
            </>
          )}
          refreshControl={
            !isTheFirstOpenHistory && (
              <MyRefreshControl
                refreshing={refreshLoading}
                onRefresh={() => {
                  onFetchSignalReport();
                  onHandleFetchData(true);
                }}
              />
            )
          }
        />
      )}
    </Body>
  );
}

export default HistoryScreen;
