import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import GroupDetails from '../../features/group/details/GroupDetails';
import HomePage from '../../features/home/HomePage';
import Navigation from './Navigation/Navigation';

const App: React.FC = () => {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navigation />
            <div className="container">
              <Switch>
                <Route exact path='/groups' component={GroupDashboard} />
                <Route path='/groups/:id' component={GroupDetails} />
              </Switch>
            </div>
          </>
        )}
        />
    </>
  );
};

export default observer(App);