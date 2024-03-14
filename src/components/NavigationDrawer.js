//src//components//NavigationDrawer.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const NavigationDrawer = ({ navigation }) => {
  return (
    <View>
      <Text>Drawer Content</Text>
      <Button title="Home" onPress={() => navigation.navigate('ContactListScreen')} />
      <Button title="Favorites" onPress={() => navigation.navigate('FavoriteContactListScreen')} />
    </View>
  );
};

export default NavigationDrawer;
