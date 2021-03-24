import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import GroupDetails from '../../features/group/details/GroupDetails';
import HomePage from '../../features/home/HomePage';
import LoginPage from '../../features/login/LoginPage';
import { useStore } from '../stores/store';
import Loading from './Loading/Loading';
import Navigation from './Navigation/Navigation';

const App: React.FC = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);
  if (!commonStore.appLoaded) {
    return (
    <div className='container-full'>
      <Loading content='Загрузка приложения...' />
    </div>)
  }
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navigation />
            <div className="container container-full">
              <Switch>
                <Route exact path='/groups' component={GroupDashboard} />
                <Route path='/groups/:id' component={GroupDetails} />
                <Route path='/login' component={LoginPage} />
              </Switch>
            </div>
          </>
        )}
        />
    </>
  );
};

export default observer(App);