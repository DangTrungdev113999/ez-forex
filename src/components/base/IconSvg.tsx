import React, { memo } from 'react';
import { SvgXml, SvgCssUri, SvgUri } from 'react-native-svg';
import Block from './Block';
import Touchable, { Propstype as TouchableType } from './Touchable';

type PropsType = TouchableType & {
  xml?: string;
  touchable?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  hitSlop?: Record<string, number>;
  size?: number;
  uri?: string | any;
};

const IconSvg = ({ xml, uri, touchable, iconWidth, iconHeight, hitSlop, ...rest }: PropsType) => {
  const Wrapper = touchable ? Touchable : Block;

  if (iconWidth || iconHeight) {
    return (
      <Wrapper hitSlop={hitSlop} {...rest}>
        {xml ? (
          <SvgXml xml={xml} width={iconWidth} height={iconHeight} hitSlop={hitSlop} />
        ) : (
          <SvgUri uri={uri} width={iconWidth} height={iconHeight} hitSlop={hitSlop} />
        )}
      </Wrapper>
    );
  }
  return (
    <Wrapper hitSlop={hitSlop} {...rest}>
      {xml ? <SvgXml xml={xml} hitSlop={hitSlop} /> : <SvgCssUri uri={uri} hitSlop={hitSlop} />}
    </Wrapper>
  );
};

export default memo(IconSvg);
