import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <h1>Timetable</h1>
        <Link to='/groups'>Моё расписание</Link>
      </div>
    </div>
  );
}

export default HomePage;