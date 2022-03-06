import React, { memo } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

const MyRefreshControl = ({ ...props }: RefreshControlProps) => (
  <RefreshControl colors={['#fff']} tintColor='#fff' {...props} />
);

export default memo(MyRefreshControl);
