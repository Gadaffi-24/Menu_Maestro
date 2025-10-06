import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COURSE_OPTIONS, MenuItem } from './types';

// Define navigation parameters
type RootStackParamList = {
    Home: { savedItem?: MenuItem; itemToRemoveId?: string; activeFilters?: MenuItem['course'][] };
    Filter: { currentFilters?: MenuItem['course'][] };
    AddEdit: { itemToEdit?: MenuItem };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

const FilterScreen: React.FC<Props> = ({ navigation, route }) => {
    // Get current filters from navigation params or start with an empty set
    const initialFilters = new Set(route.params?.currentFilters || []);
    // State to track which course types are currently selected
    const [selectedCourses, setSelectedCourses] = useState<Set<MenuItem['course']>>(initialFilters);

    // Function to add or remove a course from the selected set
    const toggleFilter = (course: MenuItem['course']) => {
        setSelectedCourses(prevFilters => {
            const newFilters = new Set(prevFilters);
            if (newFilters.has(course)) {
                newFilters.delete(course); // Remove if already present
            } else {
                newFilters.add(course); // Add if not present
            }
            return newFilters;
        });
    };

    // Function to apply filters and navigate back to Home screen
    const applyFilters = () => {
        const filtersArray = Array.from(selectedCourses);
        // Pass the array of active filters back to the Home screen
        navigation.navigate('Home', { activeFilters: filtersArray });
    };

    // Function to clear all filters and navigate back to Home
    const resetFilters = () => {
        navigation.navigate('Home', { activeFilters: [] });
    };

    // Component to display a single filter row with a toggle switch
    const FilterRow: React.FC<{ course: MenuItem['course'] }> = ({ course }) => {
        const isActive = selectedCourses.has(course);

        return (
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>{course}</Text>
                <Switch
                    value={isActive}
                    onValueChange={() => toggleFilter(course)}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Filter Menu by Course</Text>
                {/* Render a FilterRow for each available course option */}
                {COURSE_OPTIONS.map(course => (
                    <FilterRow key={course} course={course} />
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button
                    title="Reset Filters"
                    onPress={resetFilters}
                    color="#ff6347"
                />
                <Button
                    title="Apply Filters"
                    onPress={applyFilters}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    filterLabel: { fontSize: 16 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#ccc' }
});

export default FilterScreen;
