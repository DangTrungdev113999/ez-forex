import React, { memo } from 'react';
import { Block, IconSvg, Text, Touchable, Loading } from '~/components';
import SvgDefault from '~/assets/svg';
import ColorsDefault from '~/assets/colors';

type PropsType = {
  icon: string;
  name: string;
  textRight?: string;
  onPress?: any;
  error?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

function DiscoverAlertDetailItem({
  icon,
  name,
  textRight = '',
  onPress,
  error = false,
  loading = false,
  disabled,
  ...rest
}: PropsType) {
  return (
    <Touchable
      p={15}
      mt={8}
      row
      justifyBetween
      bg={ColorsDefault.bgPrimary}
      borderRadius={12}
      onPress={onPress}
      borderColor={error ? ColorsDefault.red : ColorsDefault.bgPrimary}
      borderWidth={1}
      disabled={disabled || loading}
      {...rest}>
      <Block row middle>
        <IconSvg xml={icon} />
        <Text ml={14} type='c1' fontWeight='medium'>
          {name}
        </Text>
      </Block>

      <Block row middle>
        <Text mr={10} type='c1' color={ColorsDefault.textGrayDark}>
          {textRight}
        </Text>
        {loading && <Loading />}
        {!loading && <IconSvg xml={SvgDefault.arrowRight} />}
      </Block>
    </Touchable>
  );
}

export default memo(DiscoverAlertDetailItem);
