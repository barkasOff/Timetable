export interface IGroup {
  id: string;
  number: string;
  weeks: IWeek[];
}

export interface  IWeek {
  id: string;
  isEven: boolean;
  date: string;
  days: IDay[];
}

export interface  IDay {
  id: string;
  name: string;
  date: string;
  subjects: ISubject[];
}
export interface ISubject {
  id: string;
  discipline: string;
  cabinet: number;
  building: number;
  type: string;
}