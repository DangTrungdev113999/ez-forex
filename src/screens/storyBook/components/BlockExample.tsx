import * as React from 'react';
import SvgDefault from '~/assets/svg';
import ColorsDefault from '~/assets/colors';
import { Block, Body, IconSvg, Text } from '~/components';
import { moderateScale } from '~/common';

function BlockExample() {
  return (
    <Body scroll keyboardAvoid>
      <Text mt={20} mh={10} type='h5' fontWeight='medium'>
        - Block is a View
      </Text>
      <Text mh={10} type='h5'>
        - Pass props to style. Example :
      </Text>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyBetween middle.
      </Text>

      <Block
        row
        justifyBetween
        middle
        bg={ColorsDefault.bgPrimary}
        p={10}
        height={100}
        borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyAround middle
      </Text>
      <Block row justifyAround middle bg={ColorsDefault.bgPrimary} p={10} height={100} borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row center middle
      </Text>
      <Block row center middle bg={ColorsDefault.bgPrimary} p={10} height={100} borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyEnd middle
      </Text>
      <Block row justifyEnd middle bg={ColorsDefault.bgPrimary} p={10} height={100} borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyStart middle
      </Text>
      <Block row justifyStart middle bg={ColorsDefault.bgPrimary} p={10} height={100} borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyBetween
      </Text>
      <Block row justifyBetween bg={ColorsDefault.bgPrimary} p={10} height={100} borderBottom>
        <Block circle={30} bg={ColorsDefault.white} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} />
      </Block>

      <Text mv={10} mh={10} type='h5' fontWeight='medium'>
        Prop: row justifyBetween alignItemsEnd
      </Text>
      <Block
        row
        justifyBetween
        alignItemsEnd
        bg={ColorsDefault.bgPrimary}
        p={10}
        height={100}
        borderBottom>
        <Block circle={30} bg={ColorsDefault.white} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} />
      </Block>

      <Block p={10} row borderBottom>
        <IconSvg xml={SvgDefault.game} mr={20} />
        <Text flex={1}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam dolorum nam blanditiis
          quas, perferendis optio neque quaerat. Quia et facilis laboriosam qui. Animi placeat natus
          minus maxime aspernatur nobis ipsam.
        </Text>
      </Block>

      <Block row middle mh={10} mt={20}>
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
      </Block>
    </Body>
  );
}

export default BlockExample;
