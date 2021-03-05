import { createContext, useContext } from "react";
import SubjectStore from "./subjectStore";

interface IStore {
  subjectStore: SubjectStore
}

export const  store: IStore = {
  subjectStore: new SubjectStore()
}

export const  StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}