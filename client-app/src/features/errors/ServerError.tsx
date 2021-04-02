import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';

const ServerError: React.FC = () => {
  const { commonStore } = useStore();

  return (
    <div className="errors__se">
      <div className="errors__se-header">Server Error</div>
      <div className="errors__se-subheader">{commonStore.error?.message}</div>
      {commonStore.error?.details && 
        <div className="errors__se-details">
          <span>Stack Trace</span>
          {commonStore.error?.details}
        </div>}
    </div>
  );
}

export default  observer(ServerError);