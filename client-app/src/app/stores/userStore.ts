import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IUser, IUserForm } from "../models/user";
import { store } from "./store";

export default class  UserStore {
  user: IUser | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return (!!this.user);
  }

  login = async (creds : IUserForm) => {
    this.loading = true;
    try {
      const user = await agent.Account.login(creds);

      store.commonStore.setToken(user.token);
      runInAction(() => this.user = user);
      history.push('/groups');
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.user = null;
    history.push('/');
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      
      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }
}