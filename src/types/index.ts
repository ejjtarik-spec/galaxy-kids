export type Child = {
  id: string;
  name: string;
  age: number;
  avatar: string;
  xp: number;
  coins: number;
  streak: number;
  lastBonusDate: string;
};

export type Task = {
  id: string;
  title: string;
  xp: number;
  coins: number;
  done: boolean;
  date?: string;
};

export type Reward = {
  name: string;
  price: number;
};

export type ScheduleActivity = {
  id: string;
  title: string;
  time: string;
  icon: string;
  completed: boolean;
};

export type EcoAction = {
  id: string;
  title: string;
  icon: string;
  category: "food" | "water" | "electricity" | "ecology";
  stars: number;
  energy: number;
  done: boolean;
};