import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { ISubject } from "../../app/models/subject";

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Subjects.list()
      .then((response: ISubject[]) => {
        setSubjects(response);
        setLoading(false);
      });
  }, []);

  const renderSubjects = (subject : ISubject) => {
    return (
      <tr key={subject.id}>
        <td>{subject.day}</td>
        <td>{subject.discipline}</td>
        <td>{subject.week ? 'Четная' : 'Нечетная'}</td>
        <td>{subject.cabinet}</td>
        <td>{subject.building}</td>
        <td>{subject.type}</td>
        <td>{subject.teacher}</td>
      </tr>
    );
  };

  if (loading) {
    return <LoadingComponents />;
  }
  return (
    <>
      <ul>
        <table>
          <thead>
            <tr>
              <th>День недели</th>
              <th>Дисциплина</th>
              <th>Неделя</th>
              <th>Кабинет</th>
              <th>Здание</th>
              <th>Тип</th>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(renderSubjects)}
          </tbody>
        </table>
      </ul>
    </>
  );
}

export default SubjectList;