import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonPlaceholderWrapper from './SkeletonPlaceholderWrapper';

const Skeleton = SkeletonPlaceholder.Item;

const PackageSkeleton = ({ numberOfItem = 3 }) => (
  <SkeletonPlaceholderWrapper>
    <Skeleton>
      {[...Array(numberOfItem)].map((_, id) => (
        <Skeleton
          width='100%'
          height={150}
          marginTop={10}
          key={id.toString()}
          borderRadius={20}
          marginBottom={10}
        />
      ))}
    </Skeleton>
  </SkeletonPlaceholderWrapper>
);

export default PackageSkeleton;
