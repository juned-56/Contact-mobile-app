//src//screens//UpdateContactScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = openDatabase({ name: 'contacts.db' });

export default function UpdateContactScreen({ navigation, route }) {
  const { contactId } = route.params;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [isFavorite, setIsFavorite] = useState(false); // Track favorite status

  useEffect(() => {
    getContactDetails();
  }, []);

  const getContactDetails = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE id = ?',
        [contactId],
        (_, { rows }) => {
          const contact = rows.item(0);
          setName(contact.name);
          setMobile(contact.mobile);
          setLandline(contact.landline);
          setIsFavorite(contact.favorite === 1);
        }
      );
    });
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = isFavorite ? 0 : 1;
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET favorite = ? WHERE id = ?',
        [newFavoriteStatus, contactId],
        () => setIsFavorite(newFavoriteStatus === 1)
      );
    });
  };

  const updateContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET name = ?, mobile = ?, landline = ? WHERE id = ?',
        [name, mobile, landline, contactId],
        () => {
          console.log('Contact updated successfully');
          navigation.navigate('ContactListScreen');
        },
        error => {
          console.error('Error updating contact:', error);
        }
      );
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleFavorite} style={{ alignSelf: 'flex-end', marginRight: 10 }}>
        <Icon
          name={isFavorite ? 'star' : 'star-o'}
          size={30}
          color={isFavorite ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
      <Text>Update Contact</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Landline"
        value={landline}
        onChangeText={setLandline}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Update" onPress={updateContact} />
    </View>
  );
}