import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../app/layout/Loading/Loading';
import { IDay, IGroup } from '../../../app/models/group';
import { useStore } from '../../../app/stores/store';
import GroupContent from './GroupContent';

interface IProps {
  group: IGroup | undefined;
  day: IDay | undefined;
  selectDay: (day: IDay | undefined) => void;
}

const dayInit = ({group, day, selectDay}: IProps, dayName: string) => {
  const classes = ['group__day'];

  if (day?.name == dayName) {
    classes.push('group__day-active');
  }
  return (
    <div
      className={classes.join(' ')}
      onClick={() => selectDay(group!.days.find(d => d.name == dayName))}>
      {dayName}</div>
  );
}
const GroupDetails: React.FC = () => {
  const { subjectStore } = useStore(),
        { selectedGroup: group, loading, loadGroup } = subjectStore,
        { id } = useParams<{id: string}>(),
        [selectedDay, selectDay] = useState<IDay | undefined>(undefined);

  useEffect(() => {
    if (id) {
      loadGroup(id);
    }
  }, [id, loadGroup]);

  if (loading || !group) {
    return <Loading />;
  }
  if (!selectedDay) {
    selectDay(group!.days.find(d => d.name == 'Понедельник'));
  }
  return (
    <div className="group__details">
      <div className="group__header">
        <h2 className="group__title">{group!.number}</h2>
        <Link
          className="btn btn-back-to-group"
          to="/groups">
          Назад</Link>
      </div>
      <div className="group__days">
        {dayInit({group, day: selectedDay, selectDay}, 'Понедельник')}
        {dayInit({group, day: selectedDay, selectDay}, 'Вторник')}
        {dayInit({group, day: selectedDay, selectDay}, 'Среда')}
        {dayInit({group, day: selectedDay, selectDay}, 'Четверг')}
        {dayInit({group, day: selectedDay, selectDay}, 'Пятница')}
        {dayInit({group, day: selectedDay, selectDay}, 'Суббота')}
      </div>
      <GroupContent selectedDay={selectedDay!} />
    </div>
  );
};

export default  observer(GroupDetails);