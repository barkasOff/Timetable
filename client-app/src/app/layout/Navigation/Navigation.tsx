import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="container">
        <div className="navigation__wrapper">
          <div className="navigation__item">
            <div className="navigation__logo">
              <img className="navigation__icon" src="assets/timetableLogo.svg" alt="navLogo"/>
              <Link to="/" className="navigation__title">Расписание</Link>
            </div>
          </div>
          <div className="navigation__item">
            <Link to="/groups" className="navigation__text">Группы</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;