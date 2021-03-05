import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IDay, IGroup } from "../models/group";

export default class  SubjectStore {
  groups: IGroup[] = [];
  loading: boolean = false;
  selectedGroup: IGroup | undefined = undefined;
  selectedDay: IDay | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  loadGroups = async (): Promise<void> => {
    this.setLoading(true);
    try {
      const groups = await agent.Groups.list();

      groups.forEach(g => this.groups.push(g));
      this.setLoading(false);
    } catch(error) {
      console.log(error);
      this.setLoading(false);
    }
  }
  
  setLoading = (state: boolean): void => {
    this.loading = state;
  }
  
  selectGroup = (id: string): void => {
    this.selectedGroup = this.groups.find(g => g.id === id);
  }

  cancelSelectGroup = (): void => {
    this.selectedGroup = undefined;
  }
  
  selectDay = (id: string): void => {
    runInAction(() => {
      this.selectedDay = this.groups.flatMap(g => g.days).find(d => d.id == id);
    });
  };

  cancelDay = (): void  => {
    this.selectedDay = undefined;
  };
}