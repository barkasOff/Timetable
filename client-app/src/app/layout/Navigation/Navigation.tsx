import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../stores/store';

const Navigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          {store.userStore.isLoggedIn ?
          <div className="navigation__user">
            <div className="navigation__user-wrapper" onClick={() => setShowMenu(!showMenu)}>
              <div className="navigation__user-icon">
                <img src="assets/defaultUser.svg" alt="defaultUser" />
              </div>
              <div className="navigation__user-down">
                <img src="assets/down.svg" alt="down" />
              </div>
            </div>
            {showMenu ?
            <div className="navigation__user-abilities">
              <div
                className="navigation__user-ability"
                onClick={() => {
                  setShowMenu(!showMenu);
                  store.userStore.logout();
                }}>
                <img
                  src="assets/logout.svg"
                  alt="logout"
                  className="navigation__user-ability-logo" />
                <div className="navigation__user-ability-text">Logout</div>
              </div>
            </div> :
            <></>}
          </div> :
          <></>}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;