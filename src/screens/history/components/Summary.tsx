import React from 'react';
import { Block, Text } from '~/components';
import ColorsDefault from '~/assets/colors';

type DataType = {
  pips: string;
  trades: string;
  rates: string;
};

function Summary({ data }: { data: DataType }) {
  return (
    <Block pv={10} row bg={ColorsDefault.bgPrimary}>
      <Block flex={1} center middle>
        <Text
          type='h5'
          fontWeight='semiBold'
          color={data?.pips?.slice(0, 1) === '+' ? ColorsDefault.textGreen : ColorsDefault.textRed}>
          {data?.pips}
        </Text>
        <Text mt={5} color={ColorsDefault.textPurple}>
          Pips
        </Text>
      </Block>
      <Block flex={1} center middle>
        <Text mt={5} type='h5' fontWeight='semiBold' color={ColorsDefault.textGreen}>
          {data?.trades}
        </Text>
        <Text mt={5} color={ColorsDefault.textPurple}>
          Trades
        </Text>
      </Block>
      <Block flex={1} center middle>
        <Text
          mt={5}
          type='h5'
          fontWeight='semiBold'
          color={
            data?.rates?.slice(0, 1) === '+' ? ColorsDefault.textGreen : ColorsDefault.textRed
          }>
          {data?.rates} %
        </Text>
        <Text mt={5} color={ColorsDefault.textPurple}>
          Win Rate
        </Text>
      </Block>
    </Block>
  );
}

export default Summary;
