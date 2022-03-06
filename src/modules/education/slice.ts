/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { EducationStateType } from './model';

const initialState: EducationStateType = {
  educations: [],
  fetchEducationsLoading: false,

  isTheFirstOpenEducation: true,
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    fetchEducations: (state, action) => {
      state.fetchEducationsLoading = true;
    },
    fetchEducationsSucceeded: (state, action) => {
      state.fetchEducationsLoading = false;
      state.educations = action.payload;
    },
    fetchEducationsError: (state, action) => {
      state.fetchEducationsLoading = false;
    },

    saveIsTheFirstOpenEducation: (state, action) => {
      state.isTheFirstOpenEducation = false;
    },
  },
});

const { actions, reducer } = educationSlice;

export const {
  fetchEducations,
  fetchEducationsSucceeded,
  fetchEducationsError,
  saveIsTheFirstOpenEducation,
} = actions;

export default reducer;
