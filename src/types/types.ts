export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

export interface TodosInfo {
  all: number;
  inWork: number;
  completed: number;
}

export enum filter {
  all = 'all',
  inWork = 'inWork',
  completed = "completed",
}
