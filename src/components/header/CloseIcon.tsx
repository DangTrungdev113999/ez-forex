import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '../base';

function CloseIcon() {
  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <IconSvg
      touchable
      xml={SvgDefault.closeScreen}
      flex={1}
      center
      middle
      ph={24}
      onPress={onGoBack}
    />
  );
}

export default memo(CloseIcon);
