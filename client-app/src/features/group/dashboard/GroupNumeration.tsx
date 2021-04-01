import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';

const GroupNumeration: React.FC = () => {
  const { subjectStore } = useStore(),
        { setLoading, setPagingParams, pagination, clearGroups, loadGroups, loading } = subjectStore;
  const numbers = Array.from(Array(pagination ? pagination!.totalPages : 0).keys());
  const [offset, setOffset] = useState(0);
  const [actualScroll, setActualScroll] = useState(-1);
  const [actualPage, setActualPage] = useState(1);
  const targetRef = useRef<HTMLDivElement>(null);

  function scrollScrollBar(newOffset: number, turn: number) {
    const tempOffset = offset + newOffset,
          tempActualPage = actualScroll + turn;

    if (tempActualPage <= pagination!.totalPages && tempOffset >= 0) {
      setOffset(tempOffset);
      setActualScroll(tempActualPage);
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
    setActualScroll(Math.round((targetRef.current!.clientWidth - 50) / 50));
  }, [targetRef, setActualScroll]);
        
  return (
    <div className="group__numeration">
    <button
      className="btn-num group__arrow group__arrow-left"
      onClick={() => scrollScrollBar(-50, -1)}>
        <img src="assets/leftChoose.svg" alt="leftChoose"/>
    </button>
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
    </div>
    <button
      className="btn-num group__arrow group__arrow-right"
      onClick={() => scrollScrollBar(50, 1)}>
      <img src="assets/rightChoose.svg" alt="rightChoose"/>
    </button>
    </div>
  );
};

export default  observer(GroupNumeration);