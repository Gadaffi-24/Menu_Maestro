import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, COURSE_OPTIONS } from './types';

// Define navigation parameters for type safety
type RootStackParamList = {
  Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
  AddEdit: { itemToEdit?: MenuItem };
  Filter: { currentFilters?: MenuItem['course'][] };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddEdit'>;

const AddEditItemScreen: React.FC<Props> = ({ navigation, route }) => {
  // Check if the user passed an item to edit via navigation params
  const itemToEdit = route.params?.itemToEdit;
  const isEditing = !!itemToEdit;

  // --- State Initialization ---
  // Use existing item data or set default values for new items
  const [id] = useState(itemToEdit?.id || Date.now().toString()); // Use current IDs
  const [dishName, setDishName] = useState(itemToEdit?.dishName || '');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  // Price is stored as text for input handling, formatted to 2 decimal places if editing
  const [priceText, setPriceText] = useState(itemToEdit?.price ? itemToEdit.price.toFixed(2) : '');
  const [course, setCourse] = useState<MenuItem['course']>(itemToEdit?.course || COURSE_OPTIONS[0]);

  // Effect to dynamically set the screen title in the header
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Menu Item' : 'Add New Menu Item',
    });
  }, [isEditing, navigation]);

  // Function to handle saving (Add or Update)
  const handleSave = () => {
    // Basic input validation check
    if (!dishName || !description || !priceText) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    // Validate and convert price input to a float number
    const newPrice = parseFloat(priceText);
    if (isNaN(newPrice)) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    // Construct the final MenuItem object
    const savedItem: MenuItem = {
      id,
      dishName,
      description,
      price: newPrice,
      course,
    };

    // Navigate back to Home, passing the item via params for processing
    navigation.navigate('Home', { savedItem });
  };

  // Function to handle item removal (only available when editing)
  const handleRemove = () => {
    // Show confirmation dialog before deleting
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to remove '${dishName}'?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            // Navigate back to Home, passing the ID of the item to remove
            navigation.navigate('Home', { itemToRemoveId: id });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name.."
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter dish description.."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={priceText}
        onChangeText={setPriceText}
        keyboardType="numeric" // Ensures numerical keyboard for price
      />

      <Text style={styles.label}>Course Selection</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue as MenuItem['course'])}
        style={styles.picker}
      >
        {COURSE_OPTIONS.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title={isEditing ? "Update Item" : "Add Item"} onPress={handleSave} />

        {/* Shows the Remove button only when an item is being edited */}
        {isEditing && (
          <View>
            <Button title="Remove Item" onPress={handleRemove} color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  textArea: { height: 80 },
  picker: { borderWidth: 5, borderColor: '#ccc', marginBottom: 20 },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
    borderRadius: 25,
  },
});

export default AddEditItemScreen;
