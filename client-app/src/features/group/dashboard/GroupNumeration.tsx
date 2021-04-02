import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';

const GroupNumeration: React.FC = () => {
  const { subjectStore } = useStore(),
        { setLoading, setPagingParams, pagination,
          clearGroups, loadGroups, loading, selectedGroupsRegystry } = subjectStore,
        numbers = Array.from(Array(pagination ? pagination!.totalPages : 0).keys()),
        [offset, setOffset] = useState(0),
        [actualScroll, setActualScroll] = useState(0),
        [pageShift, setPageShift] = useState(0),
        [actualPage, setActualPage] = useState(1),
        targetRef = useRef<HTMLDivElement>(null);

  function scrollScrollBar(newOffset: number, turn: number) {
    const tempOffset = offset + newOffset * pageShift,
          tempActualScroll = actualScroll + turn * pageShift;

    if (pagination!.totalPages >= actualScroll && !loading) {
      if (tempActualScroll <= pagination!.totalPages && tempOffset >= 0) {
        setOffset(tempOffset);
        setActualScroll(tempActualScroll);
      } else if (tempActualScroll > pagination!.totalPages && actualScroll < pagination!.totalPages) {
        setOffset(offset + newOffset * (pagination!.totalPages - actualScroll));
        setActualScroll(pagination!.totalPages);
      } else if (actualScroll > pageShift) {
        setOffset(0);
        setActualScroll(pageShift);
      } else if (actualScroll === pageShift && offset === 0 && newOffset < 0) {
        setOffset(offset + -newOffset * (pagination!.totalPages - actualScroll));
        setActualScroll(pagination!.totalPages);
      }
    }
  }
  function turnPage(page: number) {
    if (actualPage != page && !loading) {
      setLoading(true);
      setPagingParams(new PagingParams(page));
      clearGroups();
      loadGroups().then(() => setLoading(false));
      setActualPage(page);
    }
  }
  useEffect(() => {
    if (targetRef && targetRef.current) {
      setActualScroll(Math.round((targetRef.current!.clientWidth - 50) / 50));
      setPageShift(Math.round((targetRef.current!.clientWidth - 50) / 50));
    }
  }, [targetRef, setActualScroll, setPageShift]);
  useEffect(() => {
    setOffset(0);
  }, [pagination?.totalPages, setOffset]);
      
  return (
    <div className="group__numeration">
      <button
        className="btn-num group__arrow group__arrow-left"
        onClick={() => scrollScrollBar(-50, -1)}>
          <img src="assets/leftChoose.svg" alt="leftChoose"/>
      </button>
      {selectedGroupsRegystry.size === 0 && !loading || pagination!.totalPages === 0 && loading ?
        <div className="group__error group__error-top">
          Нет групп, удовлетворяющих вашему запросу : &#40;
        </div> : 
        <div
          ref={targetRef}
          className="group__numbers"
          style={{transform: `translateX(-${offset}px)`}}>
          {numbers.map(i => {
            const classes = ['btn-num'];

            if (i + 1 === actualPage) {
              classes.push('btn-num-active');
            }
            return (<button
              key={i}
              className={classes.join(' ')}
              onClick={() => turnPage(i + 1)}>{i + 1}</button>);
          })}
        </div>}
      <button
        className="btn-num group__arrow group__arrow-right"
        onClick={() => scrollScrollBar(50, 1)}>
        <img src="assets/rightChoose.svg" alt="rightChoose"/>
      </button>
    </div>
  );
};

export default  observer(GroupNumeration);