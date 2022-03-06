import React from 'react';
import { Modal } from 'react-native';

import Block from './Block';
import Text from './Text';
import Loading from './Loading';

type PropsType = {
  title?: string;
  loading: boolean;
};

const LoadingOverlay = ({ title, loading, ...rest }: PropsType) => (
  <Modal animationType='fade' transparent visible={loading} {...rest}>
    <Block flex={1} center middle bg='rgba(0, 0, 0, 0.5)'>
      <Loading />
      <Text>{title}</Text>
    </Block>
  </Modal>
);

export default LoadingOverlay;
