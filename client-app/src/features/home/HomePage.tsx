import React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../app/stores/store';

const HomePage: React.FC = () => {
  return (
    <section className="home">
      <div className="home__wrapper">
        <h1 className="home__title">Расписание</h1>
        <h2 className="home__subtitle">Для студентов КАИ</h2>
        {!store.userStore.isLoggedIn ?
          <Link className="btn home__link" to='/login'>Авторизация</Link> :
          <Link className="btn home__link" to='/groups'>Моё расписание</Link>}
      </div>
    </section>
  );
}

export default HomePage;