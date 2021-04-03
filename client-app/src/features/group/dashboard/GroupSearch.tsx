import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStore } from '../../../app/stores/store';

const GroupSearch: React.FC = () => {
  const { subjectStore } = useStore();
        
  const searchItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    subjectStore.setPredicate('label', subjectStore.filter);
  }
  return (
    <div className="group__search">
      <input
        type="text"
        onChange={(e) => subjectStore.setFilter(e.target.value)}
        onFocus={(e) => e.target.select()}
        value={subjectStore.filter}
        placeholder='Введите нужную группу:'
        className="group__input" />
      <button
        className="btn-num group__arrow group__arrow-right group__search-img"
        onClick={(e) => searchItem(e)}>
        <img src="assets/search.svg" alt="search"/>
      </button>
    </div>
  );
};

export default  observer(GroupSearch);