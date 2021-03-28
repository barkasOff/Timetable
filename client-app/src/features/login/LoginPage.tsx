import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Loading from '../../app/layout/Loading/Loading';
import { IUserForm } from '../../app/models/user';
import { useStore } from '../../app/stores/store';

const LoginPage: React.FC = () => {
  const initialState: IUserForm = {
    email: "",
    password: ""
  };
  const { userStore } = useStore(),
        [creds, setCreds] = useState<IUserForm>(initialState);
  const { email, password } = creds;

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: Check
    userStore.login(creds);
  }
  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCreds(initialState);
  }
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({...creds, [e.target.name]: e.target.value});
  }
  return (
    <section className="login">
      <div className="login__wrapper">
        <img src="assets/KAI-logo.svg" alt="KAI-logo" className="login__logo" />
        <div className="login__header">
          <div className="login__title">Авториция</div>
          <div className="login__subtitle">Добро пожаловать на сайт КАИ!!</div>
        </div>
      </div>
      <form className="login__form">
        <input
          id="log-email"
          name="email"
          value={email}
          onChange={changeValueHandler}
          placeholder="Введите вашу электронную почту:"
          className="login__text" />
        <input
          id="log-password"
          type="password"
          name="password"
          value={password}
          onChange={changeValueHandler}
          placeholder="Введите ваш пароль:"
          className="login__text" />
          <div className="login__wrapper login__btns">
            <button
              className="btn btn-suc"
              onClick={e => loginHandler(e)}>
              {userStore.loading ? <Loading content={null} classes='loading__btn-loaded' /> : "Войти"}</button>
            <button
              className="btn btn-fai login__btn-fai"
              onClick={e => cancelHandler(e)}>
              Стереть</button>
          </div>
      </form>
    </section>
  );
}

export default  observer(LoginPage);