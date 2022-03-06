import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '../base';

function BackIcon() {
  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.goBack();
  };
  return (
    <IconSvg
      touchable
      xml={SvgDefault.arrowBack}
      flex={1}
      center
      middle
      ph={24}
      onPress={onGoBack}
    />
  );
}

export default memo(BackIcon);
