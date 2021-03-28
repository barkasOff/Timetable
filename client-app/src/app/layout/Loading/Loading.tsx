import React from 'react';

interface Props {
  content?: string | null,
  classes?: string | null
}

const Loading: React.FC<Props> = ({content = 'Загрузка...', classes = null}: Props) => {
  const classParams: string[] = ["loading__spinner"];

  if (classes) {
    classParams.push(classes);
  }
  return (
    <div className="loading">
      <div className="loading__wrapper">
        <div className={classParams.join(' ')}>
          <img src="\assets\spinner.svg" alt="loading" />
        </div>
        {content ?
        <div className="loading__content">{content}</div> :
        <></>}
        
      </div>
    </div>
  );
};

export default Loading;