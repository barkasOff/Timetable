import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../app/layout/Loading/Loading';
import { useStore } from '../../../app/stores/store';

const GroupList: React.FC = () => {
  const { subjectStore } = useStore(),
        { loading } = subjectStore;
        
  if (loading) {
    return <Loading content='Загрузка групп...' />
  }
  return (
    <div className="group__list">
      {subjectStore.getGroups.map(group => (
        <Link
          key={group.id}
          className="group__item"
          onMouseEnter={() => subjectStore.loadGroup(group.id)}
          to={`/groups/${group.id}`}>
          {group.number}
        </Link>
      ))}
    </div>
  );
};

export default  observer(GroupList);