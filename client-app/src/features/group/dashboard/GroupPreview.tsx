import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const GroupPreview: React.FC = () => {
  const { subjectStore } = useStore(),
        {selectedGroup: group} = subjectStore;

  return (
    <div className="group__preview">
      <div className="group__logo">{group?.number}</div>
      <div className="group__info">Информация о группе</div>
      <div className="group__links">
        {group && 
          <Link
            className="group__full"
            to={`/groups/${group.id}`}>
            Посмотреть расписание группы</Link>}
      </div>
    </div>
  );
}

export default  GroupPreview;