import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { moderateScale, scale, verticalScale, SpaceInStyleType } from '~/common';
import ColorsDefault from '~/assets/colors';

type PropsType = SpaceInStyleType & {
  color?: string;
};

const Loading = ({ m, mt, mr, mb, ml, mv, mh, color }: PropsType) => {
  const styledComponent = [
    m && { margin: moderateScale(m) },
    mt && { marginTop: verticalScale(mt) },
    mr && { marginRight: scale(mr) },
    mb && { marginBottom: verticalScale(mb) },
    ml && { marginLeft: scale(ml) },
    mh && { marginHorizontal: scale(mh) },
    mv && { marginVertical: verticalScale(mv) },
  ];

  const loadingProps = {
    color: ColorsDefault.white,
  };

  if (color === 'primary') {
    loadingProps.color = ColorsDefault.purple;
  }

  return <ActivityIndicator style={styledComponent as StyleProp<ViewStyle>} {...loadingProps} />;
};

export default Loading;
