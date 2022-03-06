import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import SvgDefault from '~/assets/svg';
import { Block, IconSvg } from '~/components';

import * as screenTypes from '~/common/screenTypes';
import ColorsDefault from '~/assets/colors';

function GroupPrimaryIcon() {
  const navigation = useNavigation();

  const onGoToScreen = (stack: string, screen: string) => {
    navigation.navigate(
      stack as never,
      {
        screen,
      } as never,
    );
  };

  return (
    <Block row flex={1} center middle>
      <IconSvg
        touchable
        xml={SvgDefault.premiumQuality}
        ph={20}
        onPress={() => onGoToScreen(screenTypes.PackageStack, screenTypes.PackageScreen)}
      />
      {/* <IconSvg
        touchable
        xml={SvgDefault.graduationHat}
        pr={20}
        onPress={() => onGoToScreen(screenTypes.EducationStack, screenTypes.EducationScreen)}
      /> */}
      <Block>
        <Block circle={10} absolute top={0} right={22} zIndex={10} bg={ColorsDefault.pink} />
        <IconSvg
          touchable
          xml={SvgDefault.notification}
          pr={20}
          onPress={() => onGoToScreen(screenTypes.NoticationStack, screenTypes.NoticationScreen)}
        />
      </Block>
    </Block>
  );
}

export default memo(GroupPrimaryIcon);
