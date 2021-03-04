import React from 'react';
import { IGroup } from '../../../app/models/group';

interface IProps {
  group: IGroup
}

const GroupContent: React.FC<IProps> = ({group}: IProps) => {
  return (
    <div className="group__content">
      Content
    </div>
  );
};

export default  GroupContent;