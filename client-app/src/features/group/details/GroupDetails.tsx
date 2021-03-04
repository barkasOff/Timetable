import React from 'react';
import { IGroup } from '../../../app/models/group';

interface IProps {
  group: IGroup | undefined;
  cancelGroup: () => void;
}

const GroupDetails: React.FC<IProps> = ({group, cancelGroup}: IProps) => {
  if (!group) {
    return <h1>Empty</h1>;
  }
  return (
    <div className='group'>
      <div className="container">
        <h2 className="group__title">{group.number}</h2>
        <button
          className="btn btn-back-to-group"
          onClick={cancelGroup}>
          Назад</button>
        <div className="group__wrapper">
          <div className="group__header">
            <ul className="group__days">
              <li className="group__day">Понедельник</li>
              <li className="group__day">Вторник</li>
              <li className="group__day">Среда</li>
              <li className="group__day">Четверг</li>
              <li className="group__day">Пятница</li>
              <li className="group__day">Суббота</li>
            </ul>
          </div>
          <div className="group__descr">
            <ul className="group__params">
              <li className="group__param">Дисциплина</li>
              <li className="group__param">Кабинет</li>
              <li className="group__param">Здание</li>
              <li className="group__param">Тип</li>
            </ul>
          </div>
          <div className="group__content">Content</div>
          <div className="group__info">Info</div>
        </div>
      </div>
    </div>
  );
};

export default  GroupDetails;