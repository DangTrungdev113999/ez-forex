import React, { memo } from 'react';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';
import { PACKAGE_TYPE } from '~/common';
import { Block, Gradient, Button, Text, IconSvg } from '~/components';
import { PackageType } from '~/modules/package/model';

const MAP_TYPE_TO_COLOR = {
  [PACKAGE_TYPE.ROLE_NORMAL_USER]: {
    start: ColorsDefault.card1GradientStart,
    end: ColorsDefault.card1GradientEnd,
  },
  [PACKAGE_TYPE.ROLE_PREMIUM_USER]: {
    start: ColorsDefault.card2GradientStart,
    end: ColorsDefault.card2GradientEnd,
  },
  [PACKAGE_TYPE.ROLE_GOLD_USER]: {
    start: ColorsDefault.card3GradientStart,
    end: ColorsDefault.card3GradientEnd,
  },
};

function CardPackage({
  item,
  onHandleUpdatePackageUser,
}: {
  item: PackageType;
  onHandleUpdatePackageUser: any;
}) {
  return (
    <Gradient
      mt={12}
      ph={16}
      pv={12}
      borderRadius={16}
      colors={[
        MAP_TYPE_TO_COLOR[item?.name || PACKAGE_TYPE.ROLE_NORMAL_USER].start,
        MAP_TYPE_TO_COLOR[item?.name || PACKAGE_TYPE.ROLE_NORMAL_USER].end,
      ]}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}>
      {item.name !== PACKAGE_TYPE.ROLE_NORMAL_USER && (
        <Block
          absolute
          width={37}
          height={37}
          top={0}
          right={0}
          center
          middle
          bg={
            item.name !== PACKAGE_TYPE.ROLE_PREMIUM_USER
              ? ColorsDefault.yellow
              : ColorsDefault.purple
          }
          borderBRRadius={16}>
          <IconSvg
            xml={
              item.name !== PACKAGE_TYPE.ROLE_PREMIUM_USER
                ? SvgDefault.startOrange
                : SvgDefault.startWhite
            }
          />
        </Block>
      )}

      <Block row middle>
        <IconSvg xml={SvgDefault.premiumQuality} />
        <Text ml={10} fontWeight='medium'>
          {item?.packageName}
        </Text>
      </Block>
      <Block mt={10}>
        <Text type='c1' lineHeight={18}>
          {item?.description || ''}
        </Text>
      </Block>
      <Block mt={15} row justifyBetween>
        <Block row>
          <Text ml={4} mt={6} fontWeight='medium' lineHeight={39} color={ColorsDefault.textPink}>
            $
          </Text>
          {item?.discountPrice && (
            <>
              <Text
                ml={4}
                mt={6}
                fontWeight='medium'
                lineHeight={39}
                lineThrough
                color={ColorsDefault.textPink}>
                {item?.price || ''}
              </Text>
              <Text ml={4} type='h1' fontWeight='medium' color={ColorsDefault.textPink}>
                {item?.discountPrice || ''}
              </Text>
            </>
          )}
          {!item?.discountPrice && (
            <Text ml={4} type='h1' fontWeight='medium' color={ColorsDefault.textPink}>
              {item?.price || ''}
            </Text>
          )}
        </Block>
        {item.name === PACKAGE_TYPE.ROLE_NORMAL_USER && (
          <Button
            variant='secondary'
            borderColor={ColorsDefault.purple}
            onPress={() => onHandleUpdatePackageUser(item?.name, 0)}>
            START NOW
          </Button>
        )}

        {item.name !== PACKAGE_TYPE.ROLE_NORMAL_USER && (
          <Button
            variant='secondary'
            bg={ColorsDefault.btnSecondary2}
            onPress={() =>
              onHandleUpdatePackageUser(
                item?.name,
                item.name === PACKAGE_TYPE.ROLE_PREMIUM_USER ? 1 : 2,
              )
            }>
            START NOW
          </Button>
        )}
      </Block>
    </Gradient>
  );
}

export default memo(CardPackage);
