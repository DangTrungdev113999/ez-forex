import * as React from 'react';
import ColorsDefault from '~/assets/colors';
import { Block, Text } from '~/components';

function TextExample() {
  return (
    <Block>
      <Text color={ColorsDefault.textGreen} type='h1' textCenter fontWeight='bold' mt={20}>
        Font size
      </Text>
      <Block mt={10} mh={40}>
        <Text mt={10} type='c2'>
          c2 size: 10
        </Text>
        <Text mt={5} type='c1'>
          c1 size: 12
        </Text>
        <Text mt={5}>default size: 14</Text>
        <Text mt={5} type='h5'>
          h2 size: 16
        </Text>
        <Text mt={5} type='h2'>
          h2 size: 24
        </Text>
        <Text mt={5} type='h1'>
          h1 size: 32
        </Text>
      </Block>

      <Text color={ColorsDefault.textGreen} type='h1' textCenter fontWeight='bold' mt={20}>
        Font weight
      </Text>
      <Block mt={10} mh={40}>
        <Text mt={5} fontWeight='thin'>
          thin 100
        </Text>
        <Text mt={5} fontWeight='light'>
          light 300
        </Text>
        <Text mt={5} fontWeight='medium'>
          medium 500
        </Text>
        <Text mt={5} fontWeight='semiBold'>
          semiBold 600
        </Text>
        <Text mt={5} fontWeight='bold'>
          bold 700
        </Text>
        <Text mt={5} fontWeight='extraBold'>
          extraBold 800
        </Text>
      </Block>

      <Text color={ColorsDefault.textGreen} type='h1' textCenter fontWeight='bold' mt={20}>
        Other
      </Text>

      <Block mt={10} mh={40}>
        <Block ph={20} pv={10} bg={ColorsDefault.bgPrimary}>
          <Text center>text center </Text>
          <Text textRight>text right </Text>
          <Text textLeft>text left </Text>
        </Block>
        <Text mt={5} uppercase>
          uppercase
        </Text>
        <Text lineHeight={20} mt={5}>
          lineHeight
        </Text>
        <Text underline mt={5}>
          underline
        </Text>
        <Text color={ColorsDefault.textGreen} mt={5}>
          textGreen
        </Text>
        <Text color={ColorsDefault.textOrange} mt={5}>
          textOrange
        </Text>
        <Text color={ColorsDefault.textPink} mt={5}>
          textPink
        </Text>
        <Text color={ColorsDefault.textPurple} mt={5}>
          textPurple
        </Text>
        <Text color={ColorsDefault.textRed} mt={5}>
          textRed
        </Text>
        <Text color={ColorsDefault.textGrayDark} mt={5}>
          textGrayDark
        </Text>
        <Text color={ColorsDefault.textGrayLight} mt={5}>
          textGrayLight
        </Text>
        <Text color={ColorsDefault.textGrayLight} mt={5}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit magni aliquam ad minima
          recusandae rerum cumque officiis accusantium maiores ipsam temporibus vel saepe illo,
          consequatur quod aspernatur eius libero sunt?
        </Text>
      </Block>
    </Block>
  );
}

export default TextExample;
