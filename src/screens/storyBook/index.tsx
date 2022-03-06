import React, { useState } from 'react';
import ColorsDefault from '~/assets/colors';
import { Body, Button, Block, List } from '~/components';
import BlockExample from './components/BlockExample';
import GradientExample from './components/GradientExample';
import InputExample from './components/InputExample';
import TextExample from './components/TextExample';
import TouchableExample from './components/TouchableExample';
import ButtonExample from './components/ButtonExample';

const MAP_TAB_TITLE_TO_EXAMPLE = {
  Block: <BlockExample />,
  Touchable: <TouchableExample />,
  Input: <InputExample />,
  Button: <ButtonExample />,
  Text: <TextExample />,
  Gradient: <GradientExample />,
};

type TabtitleType = keyof typeof MAP_TAB_TITLE_TO_EXAMPLE;

function StoryBook() {
  const [tabtitle, setTab] = useState<TabtitleType>('Block');

  const onhandleTab = (title: TabtitleType) => {
    setTab(title);
  };

  const rednerItem = ({ item }: { item: TabtitleType }) => (
    <Button
      variant='secondary'
      bg={item === tabtitle && ColorsDefault.btnSecondary2}
      mr={20}
      onPress={() => onhandleTab(item)}>
      {item}
    </Button>
  );

  return (
    <Body>
      <Block bg={ColorsDefault.gray}>
        <List
          data={Object.keys(MAP_TAB_TITLE_TO_EXAMPLE)}
          renderItem={rednerItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          mv={15}
          mh={10}
        />
      </Block>
      <Body scroll keyboardAvoid>
        {MAP_TAB_TITLE_TO_EXAMPLE[tabtitle as TabtitleType]}
      </Body>
    </Body>
  );
}

export default StoryBook;
