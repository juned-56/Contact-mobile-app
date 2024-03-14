//src//navigation//AppNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactListScreen';
import CreateNewContactScreen from '../screens/CreateNewContactScreen'; // Import CreateNewContactScreen
import FavoriteContactListScreen from '../screens/FavoriteContactListScreen';
import { openDatabase } from "react-native-sqlite-storage";
import UpdateContactScreen from '../screens/UpdateContactScreen';

let db = openDatabase({name: 'contacts.db'});
const Stack = createStackNavigator();

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, landline TEXT, photo TEXT, favorite INTEGER);'
  );
    });

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ContactListScreen">
      <Stack.Screen
        name="ContactListScreen"
        component={ContactListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNewContactScreen"
        component={CreateNewContactScreen} // Add CreateNewContactScreen as a screen
        options={{ title: 'Create New Contact' }}
      />
      <Stack.Screen
        name="FavoriteContactListScreen"
        component={FavoriteContactListScreen}
        options={{ title: 'Favorite Contacts' }}
      />
      <Stack.Screen
      name="UpdateContactScreen"
      component={UpdateContactScreen}
      options={{title: 'Update Contact'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;


