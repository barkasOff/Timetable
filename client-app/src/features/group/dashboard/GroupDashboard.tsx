import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Loading from '../../../app/layout/Loading/Loading';
import { useStore } from '../../../app/stores/store';
import GroupList from './GroupList';

const GroupDashboard: React.FC = () => {
  const { subjectStore } = useStore(),
        { loadGroups, groupsRegystry } = subjectStore;

  useEffect(() => {
    if (groupsRegystry.size <= 1) {
      loadGroups();
    }
  }, [groupsRegystry.size, loadGroups]);
  
  if (subjectStore.loading) {
    return <Loading />
  }
  return (
    <section className='group'>
      <GroupList />
    </section>
  );
}

export default observer(GroupDashboard);