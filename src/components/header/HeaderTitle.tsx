import React, { memo } from 'react';
import { Block, IconSvg, Text } from '../base';

type PropsType = {
  xml: string;
  title: string;
  iconWidth?: number;
  iconHeight?: number;
};

function HeaderTitle({ xml, title, iconWidth, iconHeight }: PropsType) {
  return (
    <Block flex={1} row center middle>
      <IconSvg xml={xml} iconWidth={iconWidth} iconHeight={iconHeight} />
      <Text ml={10} type='h5' fontWeight='medium'>
        {title}
      </Text>
    </Block>
  );
}

export default memo(HeaderTitle);
