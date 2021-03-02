import React from "react";
import { Link } from "react-router-dom";

const HomePage : React.FC = () => {
  return (
    <>
      <h1>Timetable</h1>
      <Link to='/groups'>Моё расписание</Link>
    </>
  );
}

export default HomePage;