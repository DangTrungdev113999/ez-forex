import React, { memo } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
// import { useTranslation } from 'react-i18next';
import { Block, Button, IconSvg, Text } from '../base';
import ColorsDefault from '~/assets/colors';
import SvgDefault from '~/assets/svg';

type PropsType = {
  onCloseModal: () => void;
  visible: boolean;
  onHandleDelete: () => void;
  title: string;
  content: string;
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ConfirmDeleteModal = ({
  onCloseModal,
  visible,
  onHandleDelete,
  title,
  content,
}: PropsType) => (
  <Modal
    isVisible={visible}
    onBackdropPress={onCloseModal}
    onBackButtonPress={onCloseModal}
    backdropOpacity={0.6}
    animationIn='fadeIn'
    animationOut='fadeOut'
    style={styles.modal}>
    <Block pv={22} ph={25} width='100%' borderRadius={20} bg={ColorsDefault.bgPrimary}>
      <Text textCenter uppercase fontWeight={'semiBold'}>
        {title}
      </Text>
      <Text mt={10} textCenter type='c1' color={ColorsDefault.textGrayDark}>
        {content}
      </Text>
      <IconSvg mt={20} xml={SvgDefault.deleteBig} middle />
      <Block row mt={20}>
        <Button
          mr={8}
          flex={1}
          variant='secondary'
          borderColor={ColorsDefault.blue}
          bg={ColorsDefault.bgPrimary}
          onPress={onCloseModal}>
          <Text color={ColorsDefault.blue}>No</Text>
        </Button>

        <Button
          ml={10}
          flex={1}
          variant='secondary'
          borderColor={ColorsDefault.blue}
          bg={ColorsDefault.blue}
          onPress={onHandleDelete}>
          <Text>Yes</Text>
        </Button>
      </Block>
    </Block>
  </Modal>
);
export default memo(ConfirmDeleteModal);
