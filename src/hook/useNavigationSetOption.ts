import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useNavigationSetOption(options: any, depens?: any = []) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options as never);
  }, [...depens]);
}
