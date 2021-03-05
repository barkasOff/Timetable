import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import { useStore } from '../stores/store';
import Loading from './Loading/Loading';

const App: React.FC = () => {
  const { subjectStore } = useStore();

  useEffect(() => {
    subjectStore.loadGroups();
  }, [subjectStore]);
  
  if (subjectStore.loading) {
    return <Loading content='Загрузка...' />
  }
  return (
    <>
      <GroupDashboard />
    </>
  );
};

export default observer(App);