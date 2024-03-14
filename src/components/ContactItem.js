//src//components//ContactItem.js 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-swipeable-row'; // Import Swipeable
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'contacts.db' });

const ContactItem = ({ contact, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(contact.favorite === 1);

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite ? 1 : 0;

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE contacts SET favorite = ? WHERE id = ?',
        [newFavoriteStatus, contact.id],
        () => setIsFavorite(newFavoriteStatus === 1)
      );
    });
  };

  const handlePress = () => {
    navigation.navigate('UpdateContactScreen', { contactId: contact.id });
  };

  const handleDelete = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id = ?',
        [contact.id],
        () => console.log('Contact deleted successfully'),
        error => console.error('Error deleting contact:', error)
      );
    });
  };

  return (
    <Swipeable rightButtons={[
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Icon name="trash" size={24} color="white" />
      </TouchableOpacity>
    ]}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>{contact.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    paddingHorizontal: 10,
  },
});

export default ContactItem;











// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Swipeable from 'react-native-swipeable-row'; // Import Swipeable
// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase({ name: 'contacts.db' });

// const ContactItem = ({ contact, navigation }) => {
//   const [isFavorite, setIsFavorite] = useState(contact.favorite === 1);
//   const [photoUri, setPhotoUri] = useState(null);

//   useEffect(() => {
//     fetchPhoto();
//   }, []);

//   const fetchPhoto = () => {
//     // Fetch the photo URI from the database
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT photo FROM contacts WHERE id = ?',
//         [contact.id],
//         (_, { rows }) => {
//          const { photo } = rows.item(0);
//           setPhotoUri(photo);
//         }
//       );
//     });
//   };

//   const toggleFavorite = () => {
//     const newFavoriteStatus = !isFavorite ? 1 : 0;

//     db.transaction(tx => {
//       tx.executeSql(
//         'UPDATE contacts SET favorite = ? WHERE id = ?',
//         [newFavoriteStatus, contact.id],
//         () => setIsFavorite(newFavoriteStatus === 1)
//       );
//     });
//   };

//   const handlePress = () => {
//     navigation.navigate('UpdateContactScreen', { contactId: contact.id });
//   };

//   const handleDelete = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'DELETE FROM contacts WHERE id = ?',
//         [contact.id],
//         () => console.log('Contact deleted successfully'),
//         error => console.error('Error deleting contact:', error)
//       );
//     });
//   };

//   return (
//     <Swipeable rightButtons={[
//       <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
//         <Icon name="trash" size={24} color="white" />
//       </TouchableOpacity>
//     ]}>
//       <TouchableOpacity onPress={handlePress}>
//         <View style={styles.container}>
//           {photoUri && (
//             <Image source={{ uri: photoUri }} style={styles.photo} />
//           )}
//           <View>
//             <Text style={styles.name}>{contact.name}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Swipeable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   photo: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 75,
//     paddingHorizontal: 10,
//   },
// });

// export default ContactItem;
