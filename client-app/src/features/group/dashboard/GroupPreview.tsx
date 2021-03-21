import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../app/layout/Loading/Loading';
import { useStore } from '../../../app/stores/store';

const GroupPreview: React.FC = () => {
  const { subjectStore } = useStore(),
        { selectedGroup: group, getSubjects } = subjectStore;

  return (
    <div className="group__preview">
    {group ? 
      <>
        <div className="group__wrapper">
          <div className="group__logo">{group?.number}</div>
          <div className="group__info">
            <div className="group__message">Информация о группе</div>
            <div className="group__descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsum veniam ad unde beatae nulla harum ipsa ducimus omnis, hic amet ex ut vero recusandae alias fugit blanditiis suscipit repellat!</div>
          </div>
        </div>
        <div className="group__subjects">
            {getSubjects(group.id).map(subject => (
              <div key={subject.id} className="group__subject">
                {subject.discipline}
              </div>
            ))}
        </div>
        <div className="group__links">
          {group && 
            <Link
              className="group__full"
              to={`/groups/${group.id}`}>
              Посмотреть расписание группы</Link>}
        </div>
      </> : <Loading />}
    </div>
  );
}

export default  GroupPreview;