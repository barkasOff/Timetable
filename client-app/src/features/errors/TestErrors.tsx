import React, { useState } from 'react';
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

const TestErrors: React.FC = () => {
  const baseUrl = 'http://localhost:5000/api/';
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
      axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
  }
  function handleBadRequest() {
      axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
  }
  function handleServerError() {
      axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
  }
  function handleUnauthorised() {
      axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
  }
  function handleBadGuid() {
      axios.get(baseUrl + 'groups/notaguid').catch(err => console.log(err.response));
  }
  function handleValidationError() {
      axios.post(baseUrl + 'groups', {}).catch(err => setErrors(err));
  }
  return (
    <section className="errors">
      <div className="errors__items">
        <button
          className="errors__item btn"
          onClick={handleNotFound}>Not Found</button>
        <button
          className="errors__item btn"
          onClick={handleBadRequest}>Bad Request</button>
        <button
          className="errors__item btn"
          onClick={handleServerError}>Server Error</button>
        <button
          className="errors__item btn"
          onClick={handleUnauthorised}>Unauthorised</button>
        <button
          className="errors__item btn"
          onClick={handleBadGuid}>Bad Guid</button>
        <button
          className="errors__item btn"
          onClick={handleValidationError}>Validation Error</button>
      </div>
      {errors == null ? <></> : <ValidationErrors errors={errors!} />}
    </section>
  );
}

          
export default  TestErrors;