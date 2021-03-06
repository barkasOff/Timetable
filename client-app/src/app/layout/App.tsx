import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import GroupDetails from '../../features/group/details/GroupDetails';
import HomePage from '../../features/home/HomePage';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/groups' component={GroupDashboard} />
        <Route path='/groups/:id' component={GroupDetails} />
      </Switch>
    </>
  );
};

export default observer(App);