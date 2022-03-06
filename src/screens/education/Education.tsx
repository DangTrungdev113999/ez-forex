import React from 'react';
import { Body, CommonSkeleton, List, MyRefreshControl } from '~/components';
import { EducationItemType } from '~/modules/education/model';

import EducationItem from './components/EducationItem';
import { useAppSelector, useHandleFetchData } from '~/hook';
import { educationsSelector, isTheFirstOpenEducationSelecter } from '~/modules/education/selectors';
import { fetchEducations } from '~/modules/education/slice';

function EducationScreen() {
  const educations = useAppSelector(educationsSelector);
  const isTheFirstOpenEducation = useAppSelector(isTheFirstOpenEducationSelecter);

  const { onHandleFetchData, refreshLoading } = useHandleFetchData({
    actionToDispatch: fetchEducations,
  });

  const renderItem = ({ item, index }: { item: EducationItemType; index: number }) => (
    <EducationItem item={item} index={index} />
  );

  return (
    <Body ph={24} pt={8}>
      {isTheFirstOpenEducation && <CommonSkeleton height={110} marginHorizontal={0} />}

      {!isTheFirstOpenEducation && (
        <List
          flex={1}
          data={educations}
          renderItem={renderItem}
          refreshControl={
            !isTheFirstOpenEducation && (
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

export default EducationScreen;
