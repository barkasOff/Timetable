import React from 'react';
import { IGroup } from '../../../app/models/group';

interface IProps {
  groups: IGroup[];
  selectGroup: (id: string) => void;
}

const GroupList: React.FC<IProps> = ({groups, selectGroup}: IProps) => {
  return (
    <div className="group__list">
      {groups.map(group => (
        <div
          className="group__item"
          onClick={() => selectGroup(group.id)}>
          {group.number}
        </div>
      ))}
    </div>
  );
};

export default  GroupList;