import * as React from 'react';
import ColorsDefault from '~/assets/colors';
import { Block, Body, Gradient } from '~/components';
import Touchable from '~/components/base/Touchable';

function GradientExample() {
  return (
    <Body scroll keyboardAvoid>
      <Gradient
        row
        justifyAround
        middle
        p={10}
        height={80}
        colors={[ColorsDefault.card2GradientStart, ColorsDefault.card2GradientEnd]}
        borderBottom>
        <Block circle={30} bg={ColorsDefault.white} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
        <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
      </Gradient>
      <Touchable>
        <Gradient
          row
          justifyAround
          middle
          p={10}
          height={80}
          colors={[ColorsDefault.card3GradientStart, ColorsDefault.card3GradientEnd]}
          borderBottom>
          <Block circle={30} bg={ColorsDefault.white} mr={10} />
          <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.yellow} mr={10} />
          <Block width={30} height={30} borderRadius={5} bg={ColorsDefault.purple} mr={10} />
        </Gradient>
      </Touchable>
    </Body>
  );
}

export default GradientExample;
