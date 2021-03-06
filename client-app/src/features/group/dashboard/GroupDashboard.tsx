import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Loading from '../../../app/layout/Loading/Loading';
import { useStore } from '../../../app/stores/store';
import GroupDetails from '../details/GroupDetails';
import GroupList from './GroupList';

const GroupDashboard: React.FC = () => {
  const { subjectStore } = useStore();

  useEffect(() => {
    subjectStore.loadGroups();
  }, [subjectStore]);
  
  if (subjectStore.loading) {
    return <Loading />
  }
  return (
    <div className='group'>
      <div className="container">
        <GroupList />
      </div>
    </div>
  );
}

export default observer(GroupDashboard);