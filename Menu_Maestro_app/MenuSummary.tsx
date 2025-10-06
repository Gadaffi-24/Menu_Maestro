import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MenuSummaryProps {
  title: string;
  value: string | number;
}

const MenuSummary: React.FC<MenuSummaryProps> = ({ title, value }) => {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    // Styles for the individual summary block
    flex: 1, // Allows two blocks to sit side-by-side within a row container
    padding: 15,
    marginHorizontal: 5, // Small gap to separate the two blocks
    backgroundColor: '#fff',
    borderRadius: 8,
    // Adds a border/shadow
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default MenuSummary;