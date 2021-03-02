import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading/Loading";
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
    <div key={subject.id} className="group__subjects">
      <div className="group__subject">{subject.discipline}</div>
      <div className="group__subject">{subject.cabinet}</div>
      <div className="group__subject">{subject.building}</div>
      <div className="group__subject">{subject.type}</div>
    </div>
  );
  const renderDays = (day: IDay) => {
    if (day.name === 'Понедельник') {
      return <div key={day.id}>{day.subjects.map(renderSubjects)}</div>
    }
  };
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
    return <Loading content='Загрузка...' />;
  }
  return (
    <section className="group">
      <div className="container">
        {groups.map(group => (
          <div key={group.id} className="group__table">
            <div className="group__title">
              {group.number}
            </div>
            <div className="group__subtitles">
                <div className="group__subtitle group__subtitle-active">Понедельник</div>
                <div className="group__subtitle">Вторник</div>
                <div className="group__subtitle">Среда</div>
                <div className="group__subtitle">Четверг</div>
                <div className="group__subtitle">Пятница</div>
                <div className="group__subtitle">Суббота</div>
            </div>
            <div className="group__cols group__subtitles">
              <div className="group__col">Дисциплина</div>
              <div className="group__col">Кабинет</div>
              <div className="group__col">Здание</div>
              <div className="group__col">Тип</div>
            </div>
            {group.weeks.map(renderWeeks)}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubjectList;