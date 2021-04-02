import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IGroup } from '../models/group';
import { PaginatedResult } from '../models/pagination';
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
  await sleep(1000);
  const pagination = response.headers['pagination'];

  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    return response as AxiosResponse<PaginatedResult<any>>;
  }
  return response;
}, (error: AxiosError) => {
  const { data, status, config } = error.response!;

  switch (status) {
    case 400:
      if (typeof data === 'string') {
        toast.error(data);
      }
      if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/not-found');
      }
      if (data.errors) {
        const modalStateErros = [];

        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErros.push(data.errors[key]);
          }
        }
        throw modalStateErros.flat();
      }
      break;
    case 401:
      toast.error('Unauthorised');
      break;
    case 404:
      history.push('/not-found');
      break;
    case 500:
      store.commonStore.setServerError(data);
      history.push('/server-error');
      break;
  }
  return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Groups = {
  list: (params: URLSearchParams) => axios.get<PaginatedResult<IGroup[]>>('/groups', {params}).then(responseBody),
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