import React from 'react';
import GroupDetails from '../details/GroupDetails';
import GroupList from './GroupList';

const GroupDashboard: React.FC = () => {
  return (
    <div className='group'>
      <div className="container">
        <GroupList />
        <GroupDetails />
      </div>
    </div>
  );
}

export default GroupDashboard;