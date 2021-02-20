import React from 'react';

interface Props {
  content?: string
}

const LoadingComponents: React.FC<Props> = ({ content = 'Загрузка...' }: Props) => {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <img src=".\assets\spinner.svg" alt="loading" />
      </div>
      <div className="loading__content">{content}</div>
    </div>
  );
};

export default LoadingComponents;