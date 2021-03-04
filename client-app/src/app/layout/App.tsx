import React, { useEffect, useState } from 'react';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import { IDay, IGroup } from '../models/group';
import agent from '../api/agent';

const App: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]),
        [selectedGroup, setSelectGroup] = useState<IGroup | undefined>(undefined),
        [selectedDay, setSelectedDay] = useState<IDay | undefined>(undefined),
        [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Groups.list()
      .then((response: IGroup[]) => {
        setGroups(response);
        setLoading(false);
      });
  }, []);

  const addSelectDay = (id: string) => {
    setSelectedDay(groups.flatMap(g => g.days).find(d => d.id == id));
  };
  const removeSelectDay = () => {
    setSelectedDay(undefined);
  };
  const selectGroup = (id: string) => {
    setSelectGroup(groups.find(g => g.id === id));
  }
  const cancelSelectGroup = () => {
    setSelectGroup(undefined);
  }
  
  return (
    <>
      <GroupDashboard
        groups={groups}
        loading={loading}
        selectedDay={selectedDay}
        addDay={addSelectDay}
        removeDay={removeSelectDay}
        group={selectedGroup}
        selectGroup={selectGroup}
        cancelGroup={cancelSelectGroup} />
    </>
  );
};

export default App;