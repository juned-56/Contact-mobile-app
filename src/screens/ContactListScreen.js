// //src//screens//ContactListScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage';
// import ContactItem from '../components/ContactItem';

// let db = openDatabase({ name: 'contacts.db' });

// export default function ContactListScreen({ navigation }) {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     getContacts();
//   }, []);

//   const getContacts = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM contacts ORDER BY name ASC',
//         [],
//         (_, { rows }) => {
//           setContacts(rows.raw());
//         }
//       );
//     });
//   };

//   const handleDeleteContact = (contactId) => {
//     setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
//   };

//   const navigateToFavoriteContacts = () => {
//     navigation.navigate('FavoriteContactListScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Contact List</Text>
//         <Button title="Refresh" onPress={getContacts} />
//         <Button title="Favorites" onPress={navigateToFavoriteContacts} />
//       </View>
//       <FlatList
//         data={contacts}
//         renderItem={({ item }) => (
//           <ContactItem contact={item} navigation={navigation} onDelete={handleDeleteContact} />
//         )}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//       <View style={styles.addButtonContainer}>
//         <Button title="+" onPress={() => navigation.navigate('CreateNewContactScreen')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     position: 'relative',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   addButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'blue',
//     borderRadius: 50,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
// });












//=============================Working one===============================

// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
// import { openDatabase } from 'react-native-sqlite-storage';
// import ContactItem from '../components/ContactItem';

// let db = openDatabase({ name: 'contacts.db' });

// export default function ContactListScreen({ navigation }) {
//   const [contacts, setContacts] = useState([]);
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     getContacts();
//   }, []);

//   const getContacts = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM contacts ORDER BY name ASC',
//         [],
//         (_, { rows }) => {
//           setContacts(rows.raw());
//         }
//       );
//     });
//   };

//   const handleDeleteContact = (contactId) => {
//     setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
//   };

//   const navigateToFavoriteContacts = () => {
//     navigation.navigate('FavoriteContactListScreen');
//   };

//   const handleSearch = (text) => {
//     setSearchText(text);
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM contacts WHERE name LIKE ?',
//         [`%${text}%`],
//         (_, { rows }) => {
//           setContacts(rows.raw());
//         }
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Contact List</Text>
//         <Button title="Refresh" onPress={getContacts} />
//         <Button title="Favorites" onPress={navigateToFavoriteContacts} />
//       </View>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search contacts..."
//         value={searchText}
//         onChangeText={handleSearch}
//       />
//       <FlatList
//         data={contacts}
//         renderItem={({ item }) => (
//           <ContactItem contact={item} navigation={navigation} onDelete={handleDeleteContact} />
//         )}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//       <View style={styles.addButtonContainer}>
//         <Button title="+" onPress={() => navigation.navigate('CreateNewContactScreen')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     position: 'relative',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   addButtonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'blue',
//     borderRadius: 50,
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });












import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import ContactItem from '../components/ContactItem';

let db = openDatabase({ name: 'contacts.db' });

export default function ContactListScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getContacts = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts ORDER BY name ASC',
        [],
        (_, { rows }) => {
          setContacts(rows.raw());
        }
      );
    });
  };

  // Use useFocusEffect to refresh contacts when component is focused
  useFocusEffect(
    React.useCallback(() => {
      getContacts();
    }, [])
  );

  const handleDeleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const navigateToFavoriteContacts = () => {
    navigation.navigate('FavoriteContactListScreen');
  };

  const handleSearch = (text) => {
    setSearchText(text);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE name LIKE ?',
        [`%${text}%`],
        (_, { rows }) => {
          setContacts(rows.raw());
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact List</Text>
        <Button title="Favorites" onPress={navigateToFavoriteContacts} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactItem contact={item} navigation={navigation} onDelete={handleDeleteContact} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View style={styles.addButtonContainer}>
        <Button title="+" onPress={() => navigation.navigate('CreateNewContactScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
