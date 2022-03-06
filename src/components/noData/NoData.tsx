import React from 'react';
import { Dimensions } from 'react-native';
import { Text, Block, IconSvg } from '~/components';
import SvgDefault from '~/assets/svg';
import ColorsDefault from '~/assets/colors';

const NoData = ({
  content = 'No data',
  iconWidth,
  iconHeight,
  ...rest
}: {
  iconWidth: number;
  iconHeight: number;
}) => (
  <Block center middle {...rest}>
    {iconWidth || iconHeight ? (
      <IconSvg xml={SvgDefault.noData} iconWidth={iconWidth} iconHeight={iconHeight} />
    ) : (
      <IconSvg xml={SvgDefault.noData} />
    )}

    {typeof content === 'string' && (
      <Text mt={10} color={ColorsDefault.grayDark}>
        {content}
      </Text>
    )}
    {typeof content !== 'string' && content}
  </Block>
);

export default NoData;
