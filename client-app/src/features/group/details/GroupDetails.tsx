import { observer } from 'mobx-react-lite';
import React from 'react';
import { IDay, IGroup } from '../../../app/models/group';
import { useStore } from '../../../app/stores/store';
import GroupContent from './GroupContent';

interface IProps {
  group: IGroup | undefined;
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
const GroupDetails: React.FC = () => {
  const { subjectStore } = useStore(),
        { selectDay, selectedDay: day, selectedGroup: group, cancelSelectGroup: cancelGroup } = subjectStore;

  if (!group) return <></>;
  if (!day) {
    selectDay(group!.days.find(d => d.name == 'Понедельник')?.id ?? '');
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
        {dayInit({group, day, selectDay}, 'Понедельник')}
        {dayInit({group, day, selectDay}, 'Вторник')}
        {dayInit({group, day, selectDay}, 'Среда')}
        {dayInit({group, day, selectDay}, 'Четверг')}
        {dayInit({group, day, selectDay}, 'Пятница')}
        {dayInit({group, day, selectDay}, 'Суббота')}
      </div>
      <GroupContent />
    </>
  );
};

export default  observer(GroupDetails);