export interface IMealForm {
  mealTime: string;
  description: string;
  calories: string;
}

export interface IMeal extends IMealForm {
  id: string;
}
