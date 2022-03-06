import React, { memo, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { Block, Button, List, Text, Touchable } from '../base';
import ColorsDefault from '~/assets/colors';
import { useAppSelector, useAppDispatch } from '~/hook';
import { timeFramesSelector } from '~/modules/alert/selectors';
import { TimeFrameItemType } from '~/modules/alert/model';
import { saveSubscribeAlert } from '~/modules/alert/slice';
import { showToastError } from '~/utils';

type PropsType = {
  onCloseModal: () => void;
  visible: boolean;
};

const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
});

const TimeFramesModal = ({ onCloseModal, visible }: PropsType) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameItemType>({ id: 0, name: '' });
  const timeFrames = useAppSelector(timeFramesSelector);

  const dispatch = useAppDispatch();

  const onHandleTimeFrame = () => {
    if (!timeFrame?.id) {
      return showToastError({
        message: 'Please choose Time-frame',
      });
    }
    dispatch(
      saveSubscribeAlert({
        timeFrame,
      }),
    );
    onCloseModal();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      backdropOpacity={0.6}
      style={styles.modal}>
      <Block p={40} bg={ColorsDefault.bgPrimary} borderTLRadius={20} borderTRRadius={20}>
        <List
          data={timeFrames}
          renderItem={({ item }) => (
            <Touchable mt={10} pb={10} borderBottom onPress={() => setTimeFrame(item)}>
              <Text
                type='h5'
                color={
                  item?.name === timeFrame?.name ? ColorsDefault.green : ColorsDefault.textGrayLight
                }
                textCenter>
                {item?.name}
              </Text>
            </Touchable>
          )}
        />

        <Button mt={35} variant='primary' onPress={onHandleTimeFrame}>
          ok
        </Button>
      </Block>
    </Modal>
  );
};
export default memo(TimeFramesModal);
