import { createSelector } from 'reselect';

const packageSelector = state => state._package;

export const packagesSelector = createSelector(packageSelector, _package => _package.packages);

export const fetchPackagesLoadingSelector = createSelector(
  packageSelector,
  _package => _package.fetchPackagesLoading,
);

export const updatePackageLoadingSelector = createSelector(
  packageSelector,
  _package => _package.updatePackageLoading,
);

export const isTheFirstOpenPackageSelecter = createSelector(
  packageSelector,
  _package => _package.isTheFirstOpenPackage,
);
