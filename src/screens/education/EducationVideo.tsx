import React from 'react';
import { useRoute } from '@react-navigation/native';
import YouTube from 'react-native-youtube-iframe';
import ColorsDefault from '~/assets/colors';
import { Block, Body, Text } from '~/components';

const getYoutubeId = (url: string) => {
  let youtubeid = url.split('v=')[1];
  const ampersandPosition = youtubeid.indexOf('&');
  if (ampersandPosition != -1) {
    youtubeid = youtubeid.substring(0, ampersandPosition);
  }

  return youtubeid;
};

function EducationVideoScreen() {
  const route = useRoute();

  const { educationItem } = route.params;

  return (
    <Body ph={24} pt={24}>
      <Block>
        <YouTube videoId={getYoutubeId(educationItem.url)} play height={200} />
      </Block>
      <Block mt={20}>
        <Text uppercase fontWeight='medium'>
          {educationItem?.title}
        </Text>
        <Text mt={8} color={ColorsDefault.textGrayDark}>
          {educationItem?.content}
        </Text>
      </Block>
    </Body>
  );
}

export default EducationVideoScreen;
