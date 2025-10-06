export type Course = 'Starter' | 'Main Dish' | 'Dessert';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  course: Course;
}

export const COURSE_OPTIONS: Course[] = ['Starter', 'Main Dish', 'Dessert'];