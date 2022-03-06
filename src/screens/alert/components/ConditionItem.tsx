import React, { useState } from 'react';
import { Switch } from 'react-native';
import { Block, Text } from '~/components';

import ColorsDefault from '~/assets/colors';
import { ConditionItemType } from '~/modules/alert/model';

type PropsType = {
  item: ConditionItemType;
  onHandleListPicked: any;
  onIscheckedById: any;
};

function ConditionItem({ item, onHandleListPicked, onIscheckedById }: PropsType) {
  return (
    <Block mt={2} ph={24} pv={16} row justifyBetween bg={ColorsDefault.bgPrimary}>
      <Block flex={1} mr={20}>
        <Text fontWeight='medium'>{item?.name}</Text>
        <Text fontWeight='medium' type='c1' color={ColorsDefault.textGreen}>
          {item?.type}
        </Text>
      </Block>
      <Switch
        value={onIscheckedById(item)}
        onValueChange={() => onHandleListPicked(item)}
        thumbColor={ColorsDefault.white}
        trackColor={{ false: '#767577', true: '#34C759' }}
      />
    </Block>
  );
}

export default ConditionItem;
