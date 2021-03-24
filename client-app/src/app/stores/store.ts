import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import SubjectStore from "./subjectStore";
import UserStore from "./userStore";

interface IStore {
  subjectStore: SubjectStore,
  userStore: UserStore,
  commonStore: CommonStore
}

export const  store: IStore = {
  subjectStore: new SubjectStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore()
}

export const  StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}