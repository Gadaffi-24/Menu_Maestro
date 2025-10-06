// Define the required color and a slightly darker version for contrast
const PRIMARY_COLOR = '#01e6ff'; // Electric Blue
const PRIMARY_DARK = '#00a3b3'; 

// TypeScript interface for menu item clarity
export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: number;
}