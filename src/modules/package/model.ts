export type PackageType = {
  id: number;
  name: string;
  packageName: string;
  description: string;
  price: any;
  discountPrice: any;
};

export type PackageStateType = {
  packages: PackageType[];
  fetchPackagesLoading: boolean;

  updatePackageLoading: boolean;

  isTheFirstOpenPackage: boolean;
};
