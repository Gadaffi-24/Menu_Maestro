import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MenuItem } from './types';
import HomeScreen from './HomeScreen';
import AddEditItemScreen from './AddEditItemScreen';
import FilterScreen from './FilterScreen';

// Logo
const Logo = require('./logo.jpg');

// Custom Header Component Definition 
const HeaderLogo: React.FC = () => (
  <View style={headerStyles.headerContainer}>
    <Image
      source={Logo}
      style={headerStyles.headerLogo}
      resizeMode="contain"
    />
    <Text style={headerStyles.headerTitle}>Menu Maestro</Text>
  </View>
);

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Aligns logo and text horizontally
    alignItems: 'center', // Centers them vertically
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// Define the complete stack navigator structure and parameters
const Stack = createNativeStackNavigator<{
  // Home: Receives data back from AddEdit or Filter
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  // AddEdit: Accepts the optional item to be edited
  AddEdit: { itemToEdit?: MenuItem };
  // Filter: Accepts the current filters for pre-selection
  Filter: { currentFilters?: MenuItem['course'][] };
}>();

const App: React.FC = () => {
  // Global state for all menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'The Chief Burger',
      description: 'Classic patty with all the fixings, house sauce.',
      price: 12.5,
      course: 'Main Dish',
    },
    {
      id: '2',
      dishName: 'Chef Salad',
      description: 'A light, zesty starter with mixed greens and pecans.',
      price: 6.0,
      course: 'Starter',
    },
    {
      id: '3',
      dishName: 'Chocolate Lava Cake',
      description: 'Warm, rich cake with a molten chocolate center.',
      price: 8.5,
      course: 'Dessert',
    },
    {
      id: '4',
      dishName: 'French Onion Soup',
      description: 'Slow-cooked caramelised onions, rich beef broth, and gruyère toast.',
      price: 7.5,
      course: 'Starter',
    },
    {
      id: '5',
      dishName: 'Crispy Calamari',
      description: 'Lightly battered calamari, served with lemon aioli.',
      price: 9.5,
      course: 'Starter',
    },
    {
      id: '6',
      dishName: 'Seafood Linguine',
      description: 'Linguine pasta tossed with prawns and mussels in a creamy garlic sauce.',
      price: 21.0,
      course: 'Main Dish',
    },
    {
      id: '7',
      dishName: 'Ribeye Steak (300g)',
      description: 'Char-grilled ribeye, served with hand-cut fries and pepper sauce.',
      price: 28.0,
      course: 'Main Dish',
    },
    {
      id: '8',
      dishName: 'Classic Apple Crumble',
      description: 'Warm baked apples topped with sweet, crunchy oat crumble.',
      price: 7.0,
      course: 'Dessert',
    },
    {
      id: '9',
      dishName: 'Vanilla Bean Panna Cotta',
      description: 'Silky smooth Italian dessert, topped with seasonal berry compote.',
      price: 8.0,
      course: 'Dessert',
    },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          //  Use headerTitle to display the custom component
          options={{ headerTitle: (props) => <HeaderLogo /> }}
        >
          {/* Use render prop to inject state props into HomeScreen */}
          {(props) => (
            <HomeScreen
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddEdit" component={AddEditItemScreen} options={{ title: 'Add New Menu Item' }} />
        <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter Menu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;