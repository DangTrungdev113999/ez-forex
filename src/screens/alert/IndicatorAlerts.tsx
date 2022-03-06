import React from 'react';
import { Body } from '~/components';

import DiscoverAlertTab from './components/alertTabs/DiscoverAlertTab';
import { useRoute } from '@react-navigation/native';

function AlertChannalScreen() {
  const route = useRoute();

  const { pairs } = route.params;

  return (
    <Body>
      <DiscoverAlertTab indexTab={1} pairs={pairs} />
    </Body>
  );
}

export default AlertChannalScreen;
