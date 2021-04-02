import React from 'react';

interface Props {
  errors: string[];
}

const ValidationErrors: React.FC<Props> = ({errors}) => {
  console.log(errors);
  return (
    <div className="errors__validation">
      {errors.map((err: string, i) => (
        <li className="errors__validation-item" key={i}>{err}</li>
      ))}
    </div>
  );
}

export default  ValidationErrors;