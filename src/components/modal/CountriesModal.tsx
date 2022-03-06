import React, { memo, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { Block, Button, List, Text, Touchable } from '../base';
import ColorsDefault from '~/assets/colors';
import { useAppSelector, useAppDispatch } from '~/hook';
import { countriesSelector } from '~/modules/account/selectors';
import { Search } from '~/components';

type PropsType = {
  onCloseModal: () => void;
  visible: boolean;
  country: string;
  setCountry: any;
};

const styles = StyleSheet.create({
  modal: {
    marginVertical: 20,
  },
});

const CountriesModal = ({ onCloseModal, visible, country, setCountry }: PropsType) => {
  const [searchText, setTxt] = useState('');
  const countries = useAppSelector(state => countriesSelector(state, searchText));

  const onSelectCountry = (name: string) => {
    setCountry(name);
    onCloseModal();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      backdropOpacity={0.6}
      style={styles.modal}>
      <Block height={500} pv={10} bg={ColorsDefault.bgPrimary} borderRadius={5}>
        <Search
          mt={20}
          mh={10}
          value={searchText}
          onChangeText={setTxt}
          placeholder='Search country...'
        />
        <Block flex={1} style={{ overflow: 'hidden' }}>
          <List
            data={countries}
            renderItem={({ item }) => (
              <Touchable mt={10} pb={10} borderBottom onPress={() => onSelectCountry(item)}>
                <Text
                  type='c1'
                  textCenter
                  color={item === country ? ColorsDefault.textGreen : ColorsDefault.textWhite}>
                  {item}
                </Text>
              </Touchable>
            )}
          />
        </Block>
      </Block>
    </Modal>
  );
};
export default memo(CountriesModal);
