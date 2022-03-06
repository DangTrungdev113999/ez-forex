import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonPlaceholderWrapper from './SkeletonPlaceholderWrapper';

const Skeleton = SkeletonPlaceholder.Item;

const CommonSkeleton = ({ numberOfItem = 5, height = 80, marginHorizontal = 20 }) => (
  <SkeletonPlaceholderWrapper>
    <Skeleton marginHorizontal={marginHorizontal}>
      {[...Array(numberOfItem)].map((_, id) => (
        <Skeleton
          width='100%'
          height={height}
          marginTop={10}
          key={id.toString()}
          borderRadius={20}
          marginBottom={10}
        />
      ))}
    </Skeleton>
  </SkeletonPlaceholderWrapper>
);

export default CommonSkeleton;
