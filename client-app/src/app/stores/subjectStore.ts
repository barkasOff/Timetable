import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { IDay, IGroup, ISubject } from "../models/group";
import { IPagination, PagingParams } from "../models/pagination";

export default class  SubjectStore {
  selectedGroupsRegystry = new Map<string, IGroup>();
  allGroupsRegystry = new Map<string, IGroup>();
  loading: boolean = false;
  loadingInitial: boolean = false;
  selectedGroup: IGroup | undefined = undefined;
  pagination: IPagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set('all', true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.clearGroups();
        this.loadGroups();
      }
    );
  }

  setLoading = (value: boolean) => {
    this.loading = value;
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => this.predicate.delete(key));
    }

    switch (predicate) {
      case 'all':
        resetPredicate();
        this.predicate.set(predicate, value);
        break;
      case 'label':
        resetPredicate();
        this.predicate.set(predicate, value);
        break;
    }
  }

  loadGroups = async (): Promise<void> => {
    this.allGroupsRegystry.size > 0 ? this.setLoading(true) : this.setLoadingInitial(true);
    try {
      const result = await agent.Groups.list(this.axiosParams);

      result.data.forEach(g => {
        runInAction(() => {
          this.selectedGroupsRegystry.set(g.id, g);
          this.allGroupsRegystry.set(g.id, g);
        });
      });
      this.setPagination(result.pagination);
      this.setLoading(false);
      this.setLoadingInitial(false);
    } catch(error) {
      console.log(error);
      this.setLoading(false);
      this.setLoadingInitial(false);
    }
  }

  clearGroups = () => {
    this.selectedGroupsRegystry.clear();
  }

  setPagination = (pagination: IPagination): void => {
    this.pagination = pagination;
  }

  loadGroup = async (id: string): Promise<void> => {
    let group: IGroup | undefined = this.getGroup(id);

    this.setLoadingInitial(true);
    if (group) {
      runInAction(() => this.selectedGroup = group);
      this.setLoadingInitial(false);
    } else {
      try {
        group = await agent.Groups.details(id);
        this.allGroupsRegystry.set(group.id, group)
        this.setGroup(group);
        this.setLoadingInitial(false);
      } catch(error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }
  
  getSubjects = (idGroup: string): ISubject[] => {
    const group: IGroup | undefined = this.getGroup(idGroup),
          days: IDay[] = group!.days;
    let   subjects: ISubject[] = [];

    if (group) {
      days.forEach(day => {
        day.subjects.forEach(subject => {
          if (!subjects.find(s => s.discipline === subject.discipline))
            subjects.push(subject)
        });
      });
    }
    return (subjects);
  }

  get axiosParams() {
    const params = new URLSearchParams();

    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => params.append(key, value));
    return (params);
  }

  get getGroups(): IGroup[] {
    return Array.from(this.selectedGroupsRegystry.values());
  }

  private setGroup = (group: IGroup): void => {
    this.selectedGroup = group;
  }

  private setLoadingInitial = (state: boolean): void => {
    this.loadingInitial = state;
  }

  private getGroup = (id: string): IGroup | undefined => {
    return this.allGroupsRegystry.get(id);
  }
}