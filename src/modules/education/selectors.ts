import { createSelector } from 'reselect';

const educationSelector = state => state.education;

export const educationsSelector = createSelector(
  educationSelector,
  education => education.educations,
);

export const fetchEducationsLoadingSelector = createSelector(
  educationSelector,
  education => education.fetchEducationsLoading,
);

export const isTheFirstOpenEducationSelecter = createSelector(
  educationSelector,
  education => education.isTheFirstOpenEducation,
);
