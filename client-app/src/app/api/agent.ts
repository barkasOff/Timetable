import axios, { AxiosResponse } from 'axios';
import { ISubject } from '../models/subject';

axios.defaults.baseURL = 'http://localhost:5000/timetable';

// TODO: delete
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
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

const Subjects = {
  list: () => requests.get<ISubject[]>('/subjects'),
  details: (id: string) => requests.get<ISubject>(`/subjects/${id}`),
  create: (subject: ISubject) => requests.post<void>('/subjects', subject),
  edit: (subject: ISubject) => requests.put<void>('/subjects', subject),
  delete: (id: string) => requests.delete<void>(`/subjects/${id}`),
}

const agent = {
  Subjects
}

export default agent;