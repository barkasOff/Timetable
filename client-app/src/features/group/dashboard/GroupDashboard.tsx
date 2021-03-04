import React from 'react';
import Loading from '../../../app/layout/Loading/Loading';
import { IDay, IGroup } from '../../../app/models/group';
import GroupDetails from '../details/GroupDetails';
import GroupList from './GroupList';

interface IProps {
  groups: IGroup[];
  loading: boolean;
  day: IDay | undefined;
  selectDay: (id: string) => void;
  cancelDay: () => void;
  group: IGroup | undefined;
  selectGroup: (id: string) => void;
  cancelGroup: () => void;
}

const GroupDashboard: React.FC<IProps> = ({groups, loading, selectDay, cancelDay, day, group, selectGroup, cancelGroup}: IProps) => {
  if (loading) {
    return <Loading content='Загрузка...' />
  }
  return (
    <div className='group'>
      <div className="container">
        <GroupList
          groups={groups}
          selectGroup={selectGroup} />
        {group &&
        <GroupDetails
          group={group}
          cancelGroup={cancelGroup}
          day={day}
          selectDay={selectDay} />}
      </div>
    </div>
  );
}

export default GroupDashboard;