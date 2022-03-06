import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ColorsDefault from '~/assets/colors';

const SkeletonPlaceholderWrapper = ({ children }: any) => (
  <SkeletonPlaceholder
    backgroundColor={ColorsDefault.bgPrimary}
    highlightColor={ColorsDefault.card1GradientStart}
    speed={1500}>
    {children}
  </SkeletonPlaceholder>
);

export default SkeletonPlaceholderWrapper;
