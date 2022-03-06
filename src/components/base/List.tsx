import React, { forwardRef, Ref } from 'react';
import { RefreshControl, FlatList, FlatListProps, Animated } from 'react-native';
import { SpaceInStyleType, LayoutInStyleType } from '~/common';
import { Block } from '~/components';

type PropsType = FlatListProps<any> &
  SpaceInStyleType &
  LayoutInStyleType & {
    freshLoading?: boolean;
    animation?: boolean;
    onRefresh?: (params: any) => void;
    keyExtractor?: (item: Record<string, any>, index: number) => number | string;
  };

const AnimatedFlatlist = Animated.FlatList;

const List = (
  {
    flex,
    m,
    mt,
    mr,
    mb,
    ml,
    mv,
    mh,
    p,
    pt,
    pr,
    pb,
    pl,
    pv,
    ph,
    freshLoading,
    onRefresh,
    keyExtractor,
    animation,
    ...rest
  }: PropsType,
  ref: Ref<any>,
) => {
  const StyledWrap = {
    flex,
    m,
    mt,
    mr,
    mb,
    ml,
    mv,
    mh,
    p,
    pt,
    pr,
    pb,
    pl,
    pv,
    ph,
  };

  if (animation) {
    return (
      <Block {...StyledWrap}>
        <AnimatedFlatlist
          ref={ref}
          refreshControl={
            onRefresh && (
              <MyRefreshControl refreshing={freshLoading as boolean} onRefresh={onRefresh} />
            )
          }
          keyExtractor={keyExtractor || ((item, index) => `${item?.id || index}`)}
          {...rest}
        />
      </Block>
    );
  }

  return (
    <Block {...StyledWrap}>
      <FlatList
        ref={ref}
        refreshControl={
          onRefresh && (
            <MyRefreshControl refreshing={freshLoading as boolean} onRefresh={onRefresh} />
          )
        }
        keyExtractor={keyExtractor || ((item, index) => `${item?.id || index}`)}
        {...rest}
      />
    </Block>
  );
};

export default forwardRef(List);
