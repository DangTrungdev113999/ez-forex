/* eslint-disable wrap-iife */
import React from 'react';
import { Body, List, PackageSkeleton, Text, Block, MyRefreshControl } from '~/components';
import CardPackage from './components/CardPackage';
import { useAppSelector, useHandleFetchData, useIAP } from '~/hook';
import { fetchPackages } from '~/modules/package/slice';
import {
  fetchPackagesLoadingSelector,
  isTheFirstOpenPackageSelecter,
  packagesSelector,
} from '~/modules/package/selectors';

function PackageScreen() {
  const packages = useAppSelector(packagesSelector);
  const fetchPackagesLoading = useAppSelector(fetchPackagesLoadingSelector);
  const isTheFirstOpenPackage = useAppSelector(isTheFirstOpenPackageSelecter);

  const { products, onHandleBuyPackage, loading } = useIAP();

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchPackages,
  });

  const onHandleUpdatePackageUser = (packageName: string, index: number) => {
    if (products[index]?.productId) {
      onHandleBuyPackage(products[index].productId, packageName);
    }
  };

  return (
    <Body p={24} loading={loading}>
      {isTheFirstOpenPackage && <PackageSkeleton />}

      {packages.length === 0 && !fetchPackagesLoading && (
        <Block>
          <Text textCenter>Full Option</Text>
        </Block>
      )}

      {!isTheFirstOpenPackage && (
        <List
          flex={1}
          data={packages}
          renderItem={({ item, index }) => (
            <CardPackage item={item} onHandleUpdatePackageUser={onHandleUpdatePackageUser} />
          )}
          refreshControl={
            !isTheFirstOpenPackage && (
              <MyRefreshControl
                refreshing={refreshLoading}
                onRefresh={() => onHandleFetchData(true)}
              />
            )
          }
        />
      )}
    </Body>
  );
}

export default PackageScreen;
