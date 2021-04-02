import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import TestErrors from '../../features/errors/TestErrors';
import GroupDashboard from '../../features/group/dashboard/GroupDashboard';
import GroupDetails from '../../features/group/details/GroupDetails';
import HomePage from '../../features/home/HomePage';
import LoginPage from '../../features/login/LoginPage';
import ProfilePage from '../../features/profile/ProfilePage';
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
      <ToastContainer position='bottom-right' hideProgressBar />
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
                <Route path='/profile' component={ProfilePage} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/not-found' component={NotFound} />
              </Switch>
            </div>
          </>
        )}
        />
    </>
  );
};

export default observer(App);