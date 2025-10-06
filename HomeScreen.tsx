import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem } from './types';
import MenuSummary from './MenuSummary';
import MenuItemCard from './MenuItemCard';

type RootStackParamList = {
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  AddEdit: { itemToEdit?: MenuItem };
  Filter: { currentFilters?: MenuItem['course'][] };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const HomeScreen: React.FC<Props> = ({ navigation, route, menuItems, setMenuItems }) => {

  const [activeFilters, setActiveFilters] = useState<MenuItem['course'][]>([]);

  const filteredMenuItems = activeFilters.length > 0
    ? menuItems.filter(item => activeFilters.includes(item.course))
    : menuItems;

  const handleEdit = useCallback((item: MenuItem) => {
    navigation.navigate('AddEdit', { itemToEdit: item });
  }, [navigation]);

  // Unified useEffect hook
  useEffect(() => {
    // 1. Handle Saved Item (Add or Edit)
    if (route.params?.savedItem) {
      const savedItem = route.params.savedItem;
      setMenuItems(prevItems => {
        const existingIndex = prevItems.findIndex(item => item.id === savedItem.id);
        if (existingIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = savedItem;
          Alert.alert("Success", `Menu item '${savedItem.dishName}' updated.`);
          return updatedItems;
        } else {
          Alert.alert("Success", `Menu item '${savedItem.dishName}' added to the menu.`);
          return [...prevItems, savedItem];
        }
      });
      navigation.setParams({ savedItem: undefined });
    }

    // 2. Handle Item Removal
    if (route.params?.itemToRemoveId) {
      const idToRemove = route.params.itemToRemoveId;
      setMenuItems(prevItems => {
        const itemRemoved = prevItems.find(item => item.id === idToRemove);
        if (itemRemoved) {
          Alert.alert("Success", `Menu item '${itemRemoved.dishName}' removed.`);
        }
        return prevItems.filter(item => item.id !== idToRemove);
      });
      navigation.setParams({ itemToRemoveId: undefined });
    }

    // 3. Handle Active Filters
    if (route.params?.activeFilters !== undefined) {
      setActiveFilters(route.params.activeFilters);

      const filterCount = route.params.activeFilters.length;
      if (filterCount > 0) {
        Alert.alert("Filters Applied", `Showing ${filterCount} course(s).`);
      } else {
        Alert.alert("Filters Cleared", "Showing all menu items.");
      }
      navigation.setParams({ activeFilters: undefined });
    }

  }, [route.params?.savedItem, route.params?.itemToRemoveId, route.params?.activeFilters, setMenuItems, navigation]);

  // --- Summary Calculations ---
  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  return (
    <View style={styles.container}>

      <Text style={styles.slogan}>
        We Serve What Sells. You Just Cook.
      </Text>

      {/* Two-Block Summary */}
      <View style={styles.summaryContainer}>
        <MenuSummary
          title="Total Menu Items"
          value={totalItems}
        />
        <MenuSummary
          title="Average Price"
          value={`R ${averagePrice.toFixed(2)}`}
        />
      </View>

      {/* Filter Button: <TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.buttonPrimary, styles.filterButtonContainer]}
        onPress={() => navigation.navigate('Filter', { currentFilters: activeFilters })}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {activeFilters.length > 0 ? `Filter Menu (${activeFilters.length})` : "Filter Menu"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemCard item={item} onEdit={handleEdit} />}
        contentContainerStyle={styles.list}
      />

      {/* Add Button: <TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.buttonPrimary, styles.addButton]}
        onPress={() => navigation.navigate('AddEdit', { itemToEdit: undefined })}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  slogan: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 20,
    marginTop: 5,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: -5,
  },
  list: { paddingBottom: 60 },

  buttonPrimary: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, // Large radius for a rounded/pill shape
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButtonContainer: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
  },
});

export default HomeScreen;