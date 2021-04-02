import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="errors__nf">
    <div className="errors__nf-icon">
      <img src="assets/search.svg" alt="search" />
    </div>
    <div className="errors__nf-text">
      Извините, данной страницы не существует : &#40;
    </div>
    <Link to="/" className="errors__link">
      Вернуться на главную
    </Link>
  </div>
)

export default  NotFound;