import React, { memo } from 'react';
import Touchable, { Propstype } from '../base/Touchable';
import SvgDefault from '~/assets/svg';
import { IconSvg } from '~/components';

type PropsType = Propstype;

const DeleteBtn = (props: PropsType) => {
  return (
    <Touchable center middle borderRadius={12} {...props}>
      <IconSvg xml={SvgDefault.deleteIcon} />
    </Touchable>
  );
};

export default memo(DeleteBtn);
