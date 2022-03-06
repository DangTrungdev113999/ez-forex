import React, { memo } from 'react';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '../base';

function BrandHorizontal() {
  return <IconSvg xml={SvgDefault.brandHorizontail} ml={24} />;
}

export default memo(BrandHorizontal);
