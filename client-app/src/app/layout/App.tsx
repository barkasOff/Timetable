import React, { useEffect, useState } from 'react';
import agent from '../api/agent';
import { ISubject } from '../models/subject';
import LoadingComponents from './LoadingComponents';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Subjects.list()
      .then((response: ISubject[]) => {
        setSubjects(response);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingComponents />;
  }
  return (
    <>
      <h1>Timetable</h1>
      <h2>Проект создан с целью автоматизации формирования расписания занятий в вузах.</h2>
      <ul>
        {subjects.map((subject: ISubject) => (
          <li key={subject.id}>{subject.discipline}</li>
        ))}
      </ul>
    </>
  );
};

export default App;