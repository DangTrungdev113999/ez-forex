import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonPlaceholderWrapper from './SkeletonPlaceholderWrapper';

const Skeleton = SkeletonPlaceholder.Item;

const { width } = Dimensions.get('window');

const SignalTabSkeleton = ({ numberOfItem = 2 }) => (
  <SkeletonPlaceholderWrapper>
    <Skeleton marginTop={20} marginHorizontal={20}>
      {[...Array(numberOfItem)].map((_, id) => (
        <Skeleton
          marginTop={20}
          key={id.toString()}
          borderRadius={5}
          flexDirection='column'
          marginBottom={10}>
          <Skeleton width={50} height={15} borderRadius={3} />
          <Skeleton
            marginTop={20}
            height={90}
            borderTopRightRadius={20}
            borderBottomRightRadius={20}
            borderBottomLeftRadius={20}
          />
          <Skeleton
            marginTop={20}
            height={90}
            borderTopRightRadius={20}
            borderBottomRightRadius={20}
            borderBottomLeftRadius={20}
          />
        </Skeleton>
      ))}
    </Skeleton>
  </SkeletonPlaceholderWrapper>
);

export default SignalTabSkeleton;
