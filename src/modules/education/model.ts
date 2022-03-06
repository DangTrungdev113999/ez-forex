export type EducationItemType = {
  content: string;
  createdAt: string;
  icon: string;
  id: number;
  title: string;
  updatedAt: string;
  url: string;
};

export type EducationStateType = {
  educations: EducationItemType[];
  fetchEducationsLoading: boolean;

  isTheFirstOpenEducation: boolean;
};
