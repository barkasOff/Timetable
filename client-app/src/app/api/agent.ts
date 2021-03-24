import axios, { AxiosResponse } from 'axios';
import { IGroup } from '../models/group';
import { IUser, IUserForm } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

// TODO: delete
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
axios.interceptors.request.use(config => {
  const token = store.commonStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return (config);
});
axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await (Promise.reject(error));
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Groups = {
  list: () => requests.get<IGroup[]>('/groups'),
  details: (id: string) => requests.get<IGroup>(`/groups/${id}`),
  create: (group: IGroup) => requests.post<void>('/groups', group),
  edit: (group: IGroup) => requests.put<void>('/groups', group),
  delete: (id: string) => requests.delete<void>(`/groups/${id}`),
}

const Account = {
  current: () => requests.get<IUser>('/account'),
  login: (user: IUserForm) => requests.post<IUser>('/account/login', user),
}

const agent = {
  Groups,
  Account
}

export default agent;