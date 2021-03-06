import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const GroupList: React.FC = () => {
  const { subjectStore } = useStore();
        
  return (
    <div className="group__list">
      {subjectStore.getGroups.map(group => (
        <Link
          key={group.id}
          className="group__item"
          to={`/groups/${group.id}`}>
          {group.number}
        </Link>
      ))}
    </div>
  );
};

export default  observer(GroupList);