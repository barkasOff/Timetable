export interface IGroup {
  id: string;
  number: string;
  days: IDay[];
}

export interface  IDay {
  id: string;
  name: string;
  date: string;
  week: boolean
  subjects: ISubject[];
}
export interface ISubject {
  id: string;
  discipline: string;
  cabinet: number;
  building: number;
  type: string;
}