import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { IDay, IGroup, ISubject } from "../models/group";

export default class  SubjectStore {
  groupsRegystry = new Map<string, IGroup>(); // TODO:
  loading: boolean = false;
  selectedGroup: IGroup | undefined = undefined;

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
  
  getSubjects = (idGroup: string): ISubject[] => {
    const group: IGroup | undefined = this.getGroup(idGroup),
          days: IDay[] = group!.days;
    let   subjects: ISubject[] = [];

    days.forEach(day => {
      day.subjects.forEach(subject => {
        if (!subjects.find(s => s.discipline === subject.discipline))
          subjects.push(subject)
      });
    });
    return (subjects);
  }

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