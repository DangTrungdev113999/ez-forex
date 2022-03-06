import React, { ReactNode } from 'react';
import { Keyboard, ScrollView, ScrollViewProps, TouchableWithoutFeedback } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay';
import Block from './Block';

import ColorsDefault from '~/assets/colors';
import { SpaceInStyleType, LayoutInStyleType } from '~/common';

type PropsType = ScrollViewProps &
  SpaceInStyleType &
  LayoutInStyleType & {
    bg?: string;
    loading?: boolean;
    loadingLabel?: string;
    keyboardAvoid?: boolean;
    scroll?: boolean;
    children?: ReactNode;
  };

const Body = ({
  p,
  pt,
  pr,
  pb,
  pl,
  pv,
  ph,
  center,
  middle,
  bg,
  loading,
  loadingLabel,
  keyboardAvoid,
  scroll,
  children,
  ...rest
}: PropsType) => {
  const isFocused = useIsFocused();

  const styledWrapper = {
    flex: 1,
    bg: bg || ColorsDefault.bgBody,
    p,
    pt,
    pr,
    pb,
    pl,
    pv,
    ph,
    center,
    middle,
  };

  let body = (
    <Block {...styledWrapper} {...rest}>
      {children}
    </Block>
  );

  // TODO error,  create ScrollBody ??
  if (scroll) {
    body = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Block {...styledWrapper}>
          <ScrollView
            keyboardDismissMode='interactive'
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            {...rest}>
            {children}
          </ScrollView>
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  if (keyboardAvoid) {
    body = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <Block {...styledWrapper} flex={1}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {children}
          </KeyboardAwareScrollView>
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  if (scroll && keyboardAvoid) {
    body = (
      <Block {...styledWrapper}>
        <ScrollView
          keyboardDismissMode='interactive'
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          {...rest}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            {children}
          </KeyboardAwareScrollView>
        </ScrollView>
      </Block>
    );
  }

  if (loading && isFocused) {
    return (
      <>
        {body}
        <LoadingOverlay loading={!!loading} title={loadingLabel || ''} />
      </>
    );
  }

  return body;
};

export default Body;
