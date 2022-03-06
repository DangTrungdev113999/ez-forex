import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export const useNetInfo = () => {
  const [netInfo, setNetInfo] = useState({});

  const onChange = (newState: NetInfoState) => {
    setNetInfo(newState);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => onChange(state));
    return () => {
      unsubscribe();
    };
  }, [netInfo]);

  return netInfo;
};
