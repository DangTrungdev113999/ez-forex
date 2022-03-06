/* eslint-disable wrap-iife */
import { useEffect, useState, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import IAP, { Subscription } from 'react-native-iap';
import { useNavigation } from '@react-navigation/native';
import { TOPPIC_SIGNAL, VALIDATE_RECEIPT_PASSWORD } from '~/common';
import { useAppDispatch, useAppSelector } from '~/hook';
import { updatePackages } from '~/modules/package/slice';
import { userInfoSelector } from '~/modules/account/selectors';

const productID = Platform.select({
  ios: ['EZforex_normal_1m', 'EZforex_premium_3m', 'EZforex_gold_12m'],
  android: ['ezforex_normal_1m', 'ezforex_premium_3m', 'ezforex_gold_12m'],
});

const MAP_PRODUCT_ID_TO_PACKAGE_NAME_IOS = {
  EZforex_normal_1m: 'ROLE_NORMAL_USER',
  EZforex_premium_3m: 'ROLE_PREMIUM_USER',
  EZforex_gold_12m: 'ROLE_GOLD_USER',
};

const MAP_PRODUCT_ID_TO_PACKAGE_NAME_ANDROID = {
  ezforex_normal_1m: 'ROLE_NORMAL_USER',
  ezforex_premium_3m: 'ROLE_PREMIUM_USER',
  ezforex_gold_12m: 'ROLE_GOLD_USER',
};

export function useIAP() {
  const [products, setProducts] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const packageName = useRef<string>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const userInfo = useAppSelector(userInfoSelector);

  const onHandleUpdatePackage = (name: string) => {
    dispatch(
      updatePackages({
        data: {
          packageName: name,
        },
        onSuccess: () => {
          packageName.current = '';
          setLoading(false);
          messaging()
            .subscribeToTopic(TOPPIC_SIGNAL)
            .then(() => console.log('Subscribed to topic TOPPIC_SIGNAL!'));
          navigation.goBack();
        },
        onError: () => {
          setLoading(false);
          packageName.current = '';
        },
      }),
    );
  };

  const onValidateReceipt = async (receipt: string, callApi?: boolean) => {
    if (Platform.OS === 'android') {
      const purchases = await IAP.getAvailablePurchases();

      // if (
      //   !callApi &&
      //   userInfo?.packageName !==
      //     MAP_PRODUCT_ID_TO_PACKAGE_NAME_ANDROID[
      //       JSON.parse(receipt)?.productId as keyof typeof MAP_PRODUCT_ID_TO_PACKAGE_NAME_ANDROID
      //     ]
      // ) {
      //   onHandleUpdatePackage(userInfo?.packageName);
      // }

      if (JSON.parse(receipt)?.purchaseToken && callApi) {
        onHandleUpdatePackage(packageName.current as string);
      }
    }

    if (Platform.OS === 'ios') {
      try {
        const receiptBody = {
          'receipt-data': receipt,
          password: VALIDATE_RECEIPT_PASSWORD,
        };
        let result: any = null;
        let isTestENV = false;

        // PRODUCT ENV
        result = await IAP.validateReceiptIos(receiptBody, false);

        // TEST ENV
        if (result.status === 21007) {
          result = await IAP.validateReceiptIos(receiptBody, true);

          isTestENV = true;
        }

        const renewaHistory = result.latest_receipt_info;

        // Check bill  at last time
        if (renewaHistory.length && result.status === 0) {
          const expiration =
            renewaHistory[isTestENV ? renewaHistory?.length - 1 : 0].expires_date_ms;

          const expired = Date.now() > expiration;

          // Handle call api update package if api fail after buy package at last time
          if (
            !expired &&
            !callApi &&
            !__DEV__ &&
            userInfo?.packageName !==
              MAP_PRODUCT_ID_TO_PACKAGE_NAME_IOS[
                renewaHistory[isTestENV ? renewaHistory?.length - 1 : 0]
                  .product_id as keyof typeof MAP_PRODUCT_ID_TO_PACKAGE_NAME_IOS
              ]
          ) {
            onHandleUpdatePackage(userInfo?.packageName);
          }

          if (!expired && callApi && packageName.current) {
            // Handle when buy package successfully
            onHandleUpdatePackage(packageName.current);
          } else if (expired) {
            // In Dev env default: expired = true
            if (isTestENV && packageName.current && callApi) {
              onHandleUpdatePackage(packageName.current);
            }
            setLoading(false);
            // messaging()
            //   .unsubscribeFromTopic(TOPPIC_SIGNAL)
            //   .then(() => console.log('Un Subscribed to topic TOPPIC_SIGNAL!'));
          }
        }
      } catch (error) {
        setLoading(false);
        console.log('validate', error);
      }
    }
  };

  const onHandleGetPurchaseHistory = async () => {
    try {
      const history = await IAP.getPurchaseHistory();
      // console.log({ history });
      const receipt = history[Platform.OS === 'ios' ? history.length - 1 : 0]?.transactionReceipt;
      onValidateReceipt(receipt, false);
    } catch (error) {
      console.log('onHandleGetPurchaseHistory', error);
    }
  };

  const onHandleGetProducts = async () => {
    try {
      await IAP.initConnection();
      if (Platform.OS === 'android') {
        await IAP.flushFailedPurchasesCachedAsPendingAndroid();
      }
      const res = await IAP.getSubscriptions(productID as string[]);

      if (Platform.OS === 'ios') {
        setProducts(res);
      } else if (Platform.OS === 'android') {
        setProducts([res[1], res[2], res[0]]);
      }

      onHandleGetPurchaseHistory();
    } catch (error) {
      console.log('onHandleGetProducts', error);
    }
  };

  useEffect(() => {
    packageName.current = '';
    onHandleGetProducts();

    const purchaseErrorListener = IAP.purchaseErrorListener(error => {
      setLoading(false);
      if (error.responseCode === '2' || error.responseCode === 1) {
        console.log('User cancel');
      } else {
        Alert.alert(
          'Error',
          `There has been an error with your purchase, error code = ${error.code}`,
        );
      }
    });

    const purchaseUpdatedListener = IAP.purchaseUpdatedListener(purchase => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        setLoading(true);
        onValidateReceipt(receipt, true);
      }
      IAP.finishTransaction(purchase);
    });

    return () => {
      purchaseErrorListener.remove();
      purchaseUpdatedListener.remove();
    };
  }, []);

  const onHandleBuyPackage = async (productId: string, pkName: string) => {
    await IAP.requestSubscription(productId);

    packageName.current = pkName;
  };

  // console.log({ products });

  return {
    products,
    onHandleBuyPackage,
    loading,
  };
}
