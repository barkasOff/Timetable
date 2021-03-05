import { observer } from 'mobx-react-lite';
import React from 'react';
import { IDay, ISubject } from '../../../app/models/group';
import { useStore } from '../../../app/stores/store';

const getSubject = (subject: ISubject) => {
  return (
    <tr key={subject.id} className="group__subjects">
      <td className="group__subject">{subject.discipline}</td>
      <td className="group__subject">{subject.cabinet}</td>
      <td className="group__subject">{subject.building}</td>
      <td className="group__subject">{subject.type}</td>
    </tr>
  );
};
const GroupContent: React.FC = () => {
  const { subjectStore } = useStore();
  
  if (!subjectStore.selectedDay) {
    return <div className="group__empty">Расписание отсутствует...</div>;
  }
  return (
    <table className="group__content">
      <thead className="group__sub-head">
        <tr className="group__params">
          <th className="group__param">Дисциплина</th>
          <th className="group__param">Кабинет</th>
          <th className="group__param">Здание</th>
          <th className="group__param">Тип</th>
        </tr>
      </thead>
      <tbody className="group__sub-body">
        {subjectStore.selectedDay.subjects.map(getSubject)}
      </tbody>
    </table>
  );
};

export default  observer(GroupContent);