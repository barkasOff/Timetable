import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Loading from '../../../app/layout/Loading/Loading';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import GroupList from './GroupList';
import GroupNumeration from './GroupNumeration';
import GroupPreview from './GroupPreview';
import GroupSearch from './GroupSearch';

const GroupDashboard: React.FC = () => {
  const { subjectStore } = useStore(),
        { loadGroups, selectedGroupsRegystry: groupsRegystry } = subjectStore;

  useEffect(() => {
    if (groupsRegystry.size <= 1) {
      loadGroups();
    }
  }, [groupsRegystry.size, loadGroups]);
  if (subjectStore.loadingInitial && !subjectStore.loading) {
    return <Loading content='Загрузка списка групп...' />
  }
  return (
    <section className='group'>
      <div className="group__control">
        <div className="group__sidebar">
          <GroupNumeration />
          <GroupSearch />
          <GroupList />
        </div>
        <GroupPreview />
      </div>
    </section>
  );
}

export default observer(GroupDashboard);