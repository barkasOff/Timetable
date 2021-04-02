import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../app/layout/Loading/Loading';
import { useStore } from '../../../app/stores/store';

const GroupList: React.FC = () => {
  const { subjectStore } = useStore(),
        { loading, selectedGroupsRegystry, getGroups, loadGroup } = subjectStore;
        
  if (loading) {
    return (
      <div className="group__list">
        <Loading content='Загрузка групп...' />
      </div>
    );
  }
  return (
    <div className="group__list">
      {selectedGroupsRegystry.size == 0 ?
        <div className="group__error">
          Нет групп, удовлетворяющих вашему запросу : &#40;
        </div>
        : getGroups.map(group => (
          <Link
            key={group.id}
            className="group__item"
            onMouseEnter={() => loadGroup(group.id)}
            to={`/groups/${group.id}`}>
            {group.number}
          </Link>
        ))}
    </div>
  );
};

export default  observer(GroupList);