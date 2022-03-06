import * as React from 'react';

export const useFocusScreen = (handler, depen) => {
  React.useEffect(() => {
    const [navigation] = depen;
    const unsubscribe = navigation.addListener('focus', () => {
      handler();
    });

    return unsubscribe;
  }, [...depen]);
};
