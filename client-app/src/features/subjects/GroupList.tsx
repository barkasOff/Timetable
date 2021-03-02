import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { IDay, IGroup, ISubject, IWeek } from "../../app/models/group";

const SubjectList: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    agent.Groups.list()
      .then((response: IGroup[]) => {
        setGroups(response);
        setLoading(false);
      });
  }, []);

  const renderSubjects = (subject: ISubject) => (
    <table key={subject.id}>
      <thead>
        <tr>
          <th>Дисциплина</th>
          <th>Кабинет</th>
          <th>Здание</th>
          <th>Тип</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td>{subject.discipline}</td>
            <td>{subject.cabinet}</td>
            <td>{subject.building}</td>
            <td>{subject.type}</td>
          </tr>
        </tbody>
    </table>
  );
  const renderDays = (day: IDay) => (
    <td key={day.id}>{day.subjects.map(renderSubjects)}</td>
  );
  const renderWeeks = (week: IWeek) => {
    week.days.sort((a, b) => (getDay(a.name) - getDay(b.name)));
    return (week.days.map(renderDays));
  };
  const getDay = (day: string) => {
    if (day === 'Понедельник') {
      return (1);
    } else if (day === 'Вторник') {
      return (2);
    } else if (day === 'Среда') {
      return (3);
    } else if (day === 'Четверг') {
      return (4);
    } else if (day === 'Пятница') {
      return (5);
    } else if (day === 'Суббота') {
      return (6);
    }
    throw Error('Некорректный день недели');
  }

  if (loading) {
    return <LoadingComponents />;
  }
  return (
    <>
      {groups.map(group => (
        <table key={group.id}>
          <caption>{group.number}</caption>
          <thead>
            <tr>
              <th>Понедельник</th>
              <th>Вторник</th>
              <th>Среда</th>
              <th>Четверг</th>
              <th>Пятница</th>
              <th>Суббота</th>
            </tr>
          </thead>
          <tbody>
            <tr>{group.weeks.map(renderWeeks)}</tr>
          </tbody>
        </table>
      ))}
    </>
  );
}

export default SubjectList;