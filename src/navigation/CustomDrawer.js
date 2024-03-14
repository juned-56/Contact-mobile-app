//scr//navigation//CustomDrawer.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomDrawer = ({ navigation }) => {
  const [activeRoute, setActiveRoute] = useState('Home');

  const navigateToScreen = (routeName) => {
    setActiveRoute(routeName);
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.drawerItem, activeRoute === 'Home' && styles.activeItem]}
        onPress={() => navigateToScreen('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.drawerItem, activeRoute === 'Favorites' && styles.activeItem]}
        onPress={() => navigateToScreen('Favorites')}>
        <Text>Favorites</Text>
      </TouchableOpacity>
      {/* Add more drawer items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  drawerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeItem: {
    backgroundColor: '#f0f0f0',
  },
});

export default CustomDrawer;
