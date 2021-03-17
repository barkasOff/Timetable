import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="container">
        <div className="navigation__wrapper">
          <Link to="/" className="navigation__item">
            <div className="navigation__logo">
              <img className="navigation__icon" src="assets/timetableLogo.svg" alt="navLogo"/>
              <div className="navigation__title">Расписание</div>
            </div>
          </Link>
          <Link to="/groups" className="navigation__item">
            <div className="navigation__text">Группы</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;