import { createContext } from "react";

export const UserContext = createContext();

export const KanbanContext = createContext({
  KanbanColumns: [],
  kanbanTasks: [],
});
