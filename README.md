# MAST5112POE PART2 2025
ST Nr: ST10495452
Name: Mokete Mantjane

Git link: https://github.com/Gadaffi-24/Menu_Maestro.git
Youtube link:

🍽️ Menu Maestro: Chef's Menu Management App
Project Overview
Menu Maestro is a mobile application designed to assist restaurant owners and chefs in managing their daily menu items. It provides a clean intuitive interface for quickly viewing, adding, editing and removing dishes along with live analytics to track performance metrics like average dish price.

Slogan: We Serve What Sells. You Just Cook.

Technical Explanation and App Functionality
The application is built using React Native with React Navigation handling the screen flows and it operates across three main screens: Home, Add/Edit Item and Filter.

1. Data Structure and State Management
The entire menu is stored in a single global state variable (menuItems) within the main App.tsx component. This state is an array of MenuItem objects, each containing: id, dishName, description, price and course.

Real Time Updates: By passing the menuItems state and it's setter function (setMenuItems) down to the HomeScreen any additions, edits or deletions trigger an immediate update across the entire app interface.

Unique IDs: Each item is assigned a unique id to ensure correct identification during editing or removal operations.

2. Home Screen (HomeScreen.tsx)
This is the main dashboard and guest view, displaying essential data and navigational controls.

Feature

Explanation

Slogan and Analytics

The screen features the slogan and two summary blocks (MenuSummary) which use the menuItems state to calculate and display the Total Menu Items and the Average Price of all dishes.

Menu Item List

Uses a FlatList to efficiently render the menu items. Each item is rendered using the MenuItemCard component.

Navigation

The Filter Menu and Add Item buttons use custom TouchableOpacity components (styled with highly rounded, pill-shaped corners for pleasing aesthetics) to navigate to the respective screens.

Persistence

Data persistence (adding, editing, deleting) is handled when navigation parameters (route.params) are received from the AddEditItemScreen. An useEffect hook monitors these parameters to update the global menuItems state.

3. Navigation and Data Passing
The application uses react-navigation/native-stack to manage the three screens. Data passing is critical, especially when returning from a screen:

AddEditItemScreen to HomeScreen: When an item is saved or removed, the screen uses navigation.navigate('Home', { savedItem: item }) or navigation.navigate('Home', { itemToRemoveId: id }). This pushes the new data (the savedItem or itemToRemoveId) back to the HomeScreen's route.params.

HomeScreen Processing: The HomeScreen's useEffect detects these parameters, updates the central menuItems state and then clears the parameters to prevent re-running the logic on subsequent renders.

4. Filtering
Filtering is handled via the FilterScreen and back on the HomeScreen:

FilterScreen: This screen collects the user's selection of active Course filters (Starter, Main Dish, Dessert).

Return Data: Upon hitting 'Apply', the selected filters are passed back to the Home screen's route.params as an array of strings (activeFilters).

Filtering Logic: The HomeScreen uses the received activeFilters state to create a filteredMenuItems list. If activeFilters is empty, all menu items are shown; otherwise, the list is filtered to include only items matching the selected courses. The FlatList then renders this filtered list.

# ScreenShots:


:copyright: Mokete.inc 
