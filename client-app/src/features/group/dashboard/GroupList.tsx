import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';

const GroupList: React.FC = () => {
  const { subjectStore } = useStore(),
        { groups, selectGroup } = subjectStore;
        
  return (
    <div className="group__list">
      {groups.map(group => (
        <div
          key={group.id}
          className="group__item"
          onClick={() => selectGroup(group.id)}>
          {group.number}
        </div>
      ))}
    </div>
  );
};

export default  observer(GroupList);