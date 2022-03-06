import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { PAIR_ITEM_TYPE } from '~/common';
import SkeletonPlaceholderWrapper from './SkeletonPlaceholderWrapper';

const Skeleton = SkeletonPlaceholder.Item;

const { width } = Dimensions.get('window');

const WathListSkeleton = ({ numberOfItem = 4, type = PAIR_ITEM_TYPE.PRIMARY }) => {
  if (type === PAIR_ITEM_TYPE.PRIMARY) {
    return (
      <SkeletonPlaceholderWrapper>
        <Skeleton marginTop={20} marginHorizontal={20}>
          {[...Array(numberOfItem)].map((_, id) => (
            <Skeleton marginTop={8} key={id.toString()} flexDirection='row' justifyContent='center'>
              <Skeleton
                marginTop={4}
                marginRight={4}
                width={width / 2 - 30}
                height={width / 2 - 50}
                borderRadius={20}
              />
              <Skeleton
                marginTop={4}
                marginLeft={4}
                width={width / 2 - 30}
                height={width / 2 - 50}
                borderRadius={20}
              />
            </Skeleton>
          ))}
        </Skeleton>
      </SkeletonPlaceholderWrapper>
    );
  }

  if (type === PAIR_ITEM_TYPE.SECONDARY) {
    return (
      <SkeletonPlaceholderWrapper>
        <Skeleton marginTop={20} marginHorizontal={30} width={80} height={20} borderRadius={5} />
        <Skeleton marginTop={20} marginHorizontal={20}>
          {[...Array(numberOfItem)].map((_, id) => (
            <Skeleton marginTop={8} key={id.toString()} flexDirection='row' justifyContent='center'>
              <Skeleton
                marginTop={4}
                marginRight={4}
                width={width - 40}
                height={80}
                borderRadius={5}
              />
            </Skeleton>
          ))}
        </Skeleton>
      </SkeletonPlaceholderWrapper>
    );
  }
  if (type === PAIR_ITEM_TYPE.SAMLL) {
    return (
      <SkeletonPlaceholderWrapper>
        <Skeleton marginTop={20} marginHorizontal={30} width={80} height={20} borderRadius={5} />
        <Skeleton marginHorizontal={20}>
          {[...Array(numberOfItem)].map((_, id) => (
            <Skeleton marginTop={8} key={id.toString()} flexDirection='row' justifyContent='center'>
              <Skeleton
                marginTop={4}
                marginRight={4}
                width={width / 3 - 20}
                height={30}
                borderRadius={5}
              />
              <Skeleton
                marginTop={4}
                marginLeft={4}
                width={width / 3 - 20}
                height={30}
                borderRadius={5}
              />
              <Skeleton
                marginTop={4}
                marginLeft={4}
                width={width / 3 - 20}
                height={30}
                borderRadius={5}
              />
            </Skeleton>
          ))}
        </Skeleton>
      </SkeletonPlaceholderWrapper>
    );
  }

  return null;
};

export default WathListSkeleton;
