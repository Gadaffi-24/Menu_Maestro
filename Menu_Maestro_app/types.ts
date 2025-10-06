export type Course = 'Starter' | 'Main Dish' | 'Dessert';    // Defines the three main categories (courses) for the menu

// Defines the shape of a single menu item object
export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  course: Course;  // The category of the dish (e.g., 'Starter')
  }

  // An array of all available course options, used for dropdown menus
export const COURSE_OPTIONS: Course[] = ['Starter', 'Main Dish', 'Dessert'];