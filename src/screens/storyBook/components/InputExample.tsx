import * as React from 'react';
import { Alert } from 'react-native';
import SvgDefault from '~/assets/svg';
import { Block, Text, Input, Email, Password } from '~/components';

function InputExample() {
  return (
    <Block>
      <Input label='Input normal' value={'Trung.dang'} placeholder='Placeholder' mt={10} mh={10} />
      <Input
        label='Input disabled'
        value={'Trung.dang'}
        disabled
        placeholder='Placeholder'
        mt={10}
        mh={10}
      />
      <Input label='Input have required' required placeholder='Placeholder' mt={10} mh={10} />
      <Input
        label='Input have icon left'
        iconLeft={SvgDefault.userActive}
        placeholder='Placeholder'
        mt={10}
        mh={10}
      />
      <Input
        label='Input have error'
        iconLeft={SvgDefault.userActive}
        placeholder='Placeholder'
        error
        errorMessage='This is error'
        mt={10}
        mh={10}
      />
      <Input
        label='Input have description'
        iconLeft={SvgDefault.userActive}
        placeholder='Placeholder'
        description='This is description'
        mt={10}
        mh={10}
      />
      <Input
        label='Input have icon right'
        iconLeft={SvgDefault.userActive}
        iconRight={SvgDefault.vuongMieng}
        placeholder='Placeholder'
        mt={10}
        mh={10}
      />
      <Input
        label='Input have icon right and can press'
        iconLeft={SvgDefault.userActive}
        iconRight={SvgDefault.eye}
        iconRightPress={() => Alert.alert('fadfasdf')}
        placeholder='Placeholder'
        mt={10}
        mh={10}
      />
      <Input
        label='Input have custome icon right'
        iconLeft={SvgDefault.email}
        iconRight={<Text>VND</Text>}
        placeholder='Placeholder'
        mt={10}
        mh={10}
      />

      <Email label='Email' mt={10} mh={10} />

      <Password label='Password have secureTextEntry' placeholder='Password' mt={10} mh={10} />
      <Password
        label='Password no have secureTextEntry'
        placeholder='Password'
        hiseSecureTextEntry
        mt={10}
        mh={10}
      />

      <Input
        label='Custome Input'
        placeholder='Placeholder'
        style={{
          borderBottomWidth: 1,
          borderColor: '#fff',
          height: 40,
        }}
        mt={10}
        mh={10}
      />

      <Input
        label='Textarea'
        multiline={true}
        height={100}
        placeholder='Description'
        mv={10}
        mh={10}
      />
    </Block>
  );
}

export default InputExample;
