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
  };
  
  export type Reward = {
    name: string;
    price: number;
  };