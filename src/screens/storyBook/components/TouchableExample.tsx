import * as React from 'react';
import { Alert } from 'react-native';
import ColorsDefault from '~/assets/colors';
import { Block, IconSvg, Text, Touchable } from '~/components';
import SvgDefault from '~/assets/svg';
import { moderateScale } from '~/common';

function TouchableExample() {
  return (
    <Block>
      <Text mt={20} mh={20} type='h5'>
        - Touchable is a TouchableOpacity
      </Text>
      <Text mh={20} type='h5'>
        - Pass props like a Block
      </Text>
      <Touchable
        row
        justifyStart
        p={10}
        mt={20}
        bg={ColorsDefault.bgPrimary}
        borderBottom
        onPress={() => Alert.alert('ok')}>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Touchable>

      <Touchable
        row
        middle
        mh={10}
        mt={20}
        p={5}
        bg={ColorsDefault.btnSmall1}
        borderRadius={5}
        onPress={() => Alert.alert('ok')}>
        <Block circle={60} bg={ColorsDefault.red} />
        <Block ml={20} flex={1}>
          <Text type='c1' fontWeight='medium'>
            Lorem ipsum dolor sit{' '}
          </Text>
          <Text type='c2'>Lorem ipsum dolor sit </Text>
          <Text type='c2'>{moderateScale(14)}</Text>
        </Block>
        <Block row center middle>
          <IconSvg touchable xml={SvgDefault.game} mr={5} />
          <IconSvg touchable xml={SvgDefault.game} />
        </Block>
      </Touchable>

      <Touchable
        width={100}
        height={30}
        mt={10}
        ml={20}
        borderRadius={10}
        bg={ColorsDefault.btnSmall1}
        center
        middle
        borderColor={ColorsDefault.green}
        borderWidth={1}
        onPress={() => Alert.alert('ok')}>
        <Text>free</Text>
      </Touchable>
    </Block>
  );
}

export default TouchableExample;
