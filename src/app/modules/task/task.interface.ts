export enum Priorities {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
}

export type ITask = {
  title: string;
  deadline: string;
  priority: Priorities;
  description: string;
};
