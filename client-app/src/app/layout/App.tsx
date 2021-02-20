import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/timetable/subjects')
      .then((response) => setSubjects(response.data));
  }, []);

  return (
    <>
      <h1>Timetable</h1>
      <h2>
        Проект создан с целью автоматизации формирования расписания занятий в вузах.
      </h2>
      <ul>
        {subjects.map((subject: any) => (
          <li key={subject.id}>{subject.discipline}</li>
        ))}
      </ul>
    </>
  );
};

export default App;