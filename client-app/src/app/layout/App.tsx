import React from 'react';
import HomePage from '../../features/home/HomePage';
import GroupList from '../../features/subjects/GroupList';
import { Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route path='/groups' component={GroupList} />
    </>
  );
};

export default App;