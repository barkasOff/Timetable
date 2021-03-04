import React from 'react';
import { IDay, IGroup } from '../../../app/models/group';
import GroupContent from './GroupContent';

interface IProps {
  group: IGroup | undefined;
  cancelGroup: () => void;
  day: IDay | undefined;
  selectDay: (id: string) => void;
}

const dayInit = ({group, day, selectDay}: IProps, dayName: string) => {
  const classes = ['group__day'];

  if (day?.name == dayName) {
    classes.push('group__day-active');
  }
  return (
    <div
    className={classes.join(' ')}
    onClick={() => selectDay(group!.days.find(d => d.name == dayName)?.id ?? '')}>
    {dayName}</div>
  );
}
const GroupDetails: React.FC<IProps> = ({group, cancelGroup, day, selectDay}: IProps) => {
  if (!day) {
    day = group!.days.find(d => d.name == 'Понедельник');
  }
  return (
    <>
      <div className="group__header">
        <h2 className="group__title">{group!.number}</h2>
        <button
          className="btn btn-back-to-group"
          onClick={cancelGroup}>
          Назад</button>
      </div>
      <div className="group__days">
        {dayInit({group, cancelGroup, day, selectDay}, 'Понедельник')}
        {dayInit({group, cancelGroup, day, selectDay}, 'Вторник')}
        {dayInit({group, cancelGroup, day, selectDay}, 'Среда')}
        {dayInit({group, cancelGroup, day, selectDay}, 'Четверг')}
        {dayInit({group, cancelGroup, day, selectDay}, 'Пятница')}
        {dayInit({group, cancelGroup, day, selectDay}, 'Суббота')}
      </div>
      <GroupContent day={day} />
    </>
  );
};

export default  GroupDetails;