//src//screens//FavoriteContactListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import ContactItem from '../components/ContactItem';

let db = openDatabase({ name: 'contacts.db' });

export default function FavoriteContactListScreen({ navigation }) {
  const [favoriteContacts, setFavoriteContacts] = useState([]);

  useEffect(() => {
    getFavoriteContacts();
  }, []);

  const getFavoriteContacts = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM contacts WHERE favorite = 1 ORDER BY name ASC',
          [],
          (_, { rows }) => {
            setFavoriteContacts(rows.raw());
          }
        );
      },
      error => {
        console.error('Error fetching favorite contacts:', error); // Log error
      }
    );
  };
  

  console.log('Favorite Contacts State:', favoriteContacts); // Log state variable

  return (
    <View>
      <Text>Favorite Contact List</Text>
      <FlatList
        data={favoriteContacts}
        renderItem={({ item }) => (
          <ContactItem contact={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}
