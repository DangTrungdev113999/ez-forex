/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PackageStateType } from './model';

const initialState: PackageStateType = {
  packages: [],
  fetchPackagesLoading: false,

  updatePackageLoading: false,

  isTheFirstOpenPackage: true,
};

const authSlice = createSlice({
  name: '_package',
  initialState,
  reducers: {
    fetchPackages: (state, action) => {
      state.fetchPackagesLoading = true;
    },
    fetchPackagesSucceeded: (state, action) => {
      state.fetchPackagesLoading = false;
      state.packages = action.payload?.data || [];
    },
    fetchPackagesError: (state, action) => {
      state.fetchPackagesLoading = false;
    },

    updatePackages: (state, action) => {
      state.updatePackageLoading = true;
    },
    updatePackagesSucceeded: (state, action) => {
      state.updatePackageLoading = false;
    },
    updatePackagesError: (state, action) => {
      state.updatePackageLoading = false;
    },

    saveIsTheFirstOpenPackage: (state, action) => {
      state.isTheFirstOpenPackage = false;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  fetchPackages,
  fetchPackagesSucceeded,
  fetchPackagesError,
  updatePackages,
  updatePackagesSucceeded,
  updatePackagesError,
  saveIsTheFirstOpenPackage,
} = actions;

export default reducer;
