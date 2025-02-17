export interface IMealForm {
  mealTime: string;
  description: string;
  calories: number;
}

export interface IMeal extends IMealForm {
  id: string;
}
