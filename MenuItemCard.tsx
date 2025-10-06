import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from './types';

interface MenuItemCardProps {
    item: MenuItem;
    // Function passed from HomeScreen to handle navigation to the AddEdit screen
    onEdit: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onEdit }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onEdit(item)} // Navigate to edit screen when tapped
            activeOpacity={0.7} // Visual feedback on press
        >
            <View style={styles.header}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.courseTag}>{item.course}</Text>
                <Text style={styles.tapToEdit}>Tap to Edit</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff', // Highlights the price
        marginLeft: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 5,
    },
    courseTag: {
        fontSize: 12,
        color: '#007bff',
        backgroundColor: '#e6f2ff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        fontWeight: '500',
    },
    tapToEdit: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    }
});

export default MenuItemCard;