import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import ColorsDefault from '~/assets/colors';
import { Block, Text, IconSvg, Touchable } from '~/components';

import * as screenTypes from '~/common/screenTypes';
import { EducationItemType } from '~/modules/education/model';
import SvgDefault from '~/assets/svg';

type PropsType = {
  item: EducationItemType;
  index: number;
};

const MAP_INDEX_TO_ICON_RIGHT = [
  SvgDefault.arrowRightPink,
  SvgDefault.arrowRightOrange,
  SvgDefault.arrowRightGreen,
  SvgDefault.arrowRightBlue,
];

function EducationItem({ item, index }: PropsType) {
  const navigation = useNavigation();

  const goToEducationVideoScreen = () => {
    navigation.navigate(
      screenTypes.EducationStack as never,
      {
        screen: screenTypes.EducationVideoScreen,
        params: {
          headerTitle: `${item.title.slice(0, 20)}...`,
          headerIcon: item?.icon || SvgDefault.forexBasic,
          educationItem: item,
        },
      } as never,
    );
  };

  return (
    <Block>
      <Touchable
        mt={8}
        p={16}
        row
        center
        bg={ColorsDefault.bgPrimary}
        borderRadius={16}
        onPress={goToEducationVideoScreen}>
        {item?.icon && <IconSvg uri={item.icon} />}
        {!item?.icon && <IconSvg xml={SvgDefault.forexBasic} />}

        <Block flex={1} mh={16}>
          <Text fontWeight='medium' uppercase>
            {item?.title}
          </Text>
          <Text mt={8} type='c1' color={ColorsDefault.textGrayDark} numberOfLines={2}>
            {item?.content}
          </Text>
        </Block>
        <Block center>
          <IconSvg xml={MAP_INDEX_TO_ICON_RIGHT[index] || SvgDefault.arrowRightPink} />
        </Block>
      </Touchable>
    </Block>
  );
}

export default EducationItem;
