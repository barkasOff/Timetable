import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IDay, IGroup } from "../models/group";

export default class  SubjectStore {
  groupsRegystry = new Map<string, IGroup>(); // TODO:
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

      groups.forEach(g => this.groupsRegystry.set(g.id, g));
      this.setLoading(false);
    } catch(error) {
      console.log(error);
      this.setLoading(false);
    }
  }

  loadGroup = async (id: string): Promise<void> => {
    let group: IGroup | undefined = this.getGroup(id);

    this.setLoading(true);
    if (group) {
      this.selectedGroup = group;
      this.setLoading(false);
    } else {
      try {
        group = await agent.Groups.details(id);
        this.groupsRegystry.set(group.id, group)
        this.setGroup(group);
        this.setLoading(false);
      } catch(error) {
        console.log(error);
        this.setLoading(false);
      }
    }
  }
  
  selectDay = (id: string): void => {
    runInAction(() => {
      this.selectedDay = this.getGroups.flatMap(g => g.days).find(d => d.id == id);
    });
  };

  cancelDay = (): void  => {
    this.selectedDay = undefined;
  };

  get getGroups(): IGroup[] {
    return Array.from(this.groupsRegystry.values());
  }

  private setGroup = (group: IGroup): void => {
    this.selectedGroup = group;
  }

  private setLoading = (state: boolean): void => {
    this.loading = state;
  }

  private getGroup = (id: string): IGroup | undefined => {
    return this.groupsRegystry.get(id);
  }
}