import React from 'react';
import { IDay, ISubject } from '../../../app/models/group';

interface IProps {
  selectedDay: IDay
}

const getSubject = (subject: ISubject) => {
  return (
    <tr key={subject.id} className="group__timetable">
      <td className="group__point">{subject.discipline}</td>
      <td className="group__point">{subject.cabinet}</td>
      <td className="group__point">{subject.building}</td>
      <td className="group__point">{subject.type}</td>
    </tr>
  );
};
const GroupContent: React.FC<IProps> = ({selectedDay}: IProps) => {
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
        {selectedDay.subjects.map(getSubject)}
      </tbody>
    </table>
  );
};

export default  GroupContent;