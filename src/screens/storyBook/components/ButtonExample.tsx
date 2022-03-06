import * as React from 'react';
import ColorsDefault from '~/assets/colors';
import { Block, Button } from '~/components';

function SomethingScreen() {
  const onPress = () => {};
  return (
    <Block>
      <Button variant='primary' mh={20} mt={20}>
        Login
      </Button>

      <Block row justifyBetween ph={12}>
        <Button variant='secondary' borderColor={ColorsDefault.purple} mt={20} onPress={onPress}>
          start now
        </Button>
        <Button variant='secondary' mt={20}>
          start now
        </Button>
        <Button variant='secondary' bg={ColorsDefault.btnSecondary2} mt={20}>
          start now
        </Button>
      </Block>

      <Block row justifyBetween ph={12}>
        <Button
          variant='small'
          bg={ColorsDefault.btnSmall1}
          borderColor={ColorsDefault.green}
          mt={20}
          onPress={onPress}>
          Buy
        </Button>
        <Button
          variant='small'
          bg={ColorsDefault.btnSmall2}
          borderColor={ColorsDefault.red}
          mt={20}>
          Sell
        </Button>
        <Button variant='small' mt={20}>
          Hello
        </Button>
        <Button variant='small' mt={20} style={{ backgroundColor: 'red' }}>
          Sell
        </Button>
      </Block>
    </Block>
  );
}

export default SomethingScreen;
