import React from 'react';
import HomePage from '../../features/home/HomePage';
import SubjectList from '../../features/subjects/SubjectList';
import { Route, Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route path='/subjects' component={SubjectList} />
    </>
  );
};

export default App;