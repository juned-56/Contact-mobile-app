//src//screens//CreateNewContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = SQLite.openDatabase(
    {
      name: 'contacts.db',
      location: 'default',
    },
    () => console.log('Database opened now Successfully'),
    error => {
      console.error('Error opening database', error);
    }
);

export default function CreateNewContactScreen({ navigation }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [landline, setLandline] = useState('');
  const [isFavorite, setIsFavorite] = useState(false); 

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); 
  };

  const saveContact = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO contacts (name, mobile, landline, favorite) VALUES (?, ?, ?, ?)',
        [name, mobile, landline, isFavorite ? 1 : 0], // Save favorite status to the database
        (_, { insertId }) => {
          console.log('Contact saved successfully');
          navigation.navigate('ContactListScreen');
        },
        error => {
          console.error('Error saving contact:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Icon name={isFavorite ? 'star' : 'star-o'} size={24} color={isFavorite ? 'gold' : 'gray'} />
      </TouchableOpacity>
      <Text>Add New Contact</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Mobile" value={mobile} onChangeText={setMobile} />
      <TextInput placeholder="Landline" value={landline} onChangeText={setLandline} />
      <Button title="Save" onPress={saveContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 2,
    right: 10,
    zIndex: 1, // Ensure the icon is clickable by setting the zIndex
  },
});














// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
// //import { launchImageLibrary } from 'ImagePicker';
// import SQLite from 'react-native-sqlite-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const db = SQLite.openDatabase(
//     {
//       name: 'contacts.db',
//       location: 'default',
//     },
//     () => console.log('Database opened now Successfully'),
//     error => {
//       console.error('Error opening database', error);
//     }
// );

// export default function CreateNewContactScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [landline, setLandline] = useState('');
//   const [photo, setPhoto] = useState(null); // Store photo URI
//   const [isFavorite, setIsFavorite] = useState(false);

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const pickImage = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo', // Specify the media type to pick
//         quality: 1, // Image quality
//       });

//       if (!result.cancelled) {
//         const source = { uri: result.uri };
//         setPhoto(source.uri); // Set the selected photo URI
//         console.log('Photo URI is add into the db.....', result.uri);
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//     }
//   };

//   const saveContact = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO contacts (name, mobile, landline, photo, favorite) VALUES (?, ?, ?, ?, ?)',
//         [name, mobile, landline, photo, isFavorite ? 1 : 0], // Save favorite status to the database
//         (_, { insertId }) => {
//           console.log('Contact saved successfully');
//           navigation.navigate('ContactListScreen');
//         },
//         error => {
//           console.error('Error saving contact:', error);
//         }
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
//         <Icon name={isFavorite ? 'star' : 'star-o'} size={24} color={isFavorite ? 'gold' : 'gray'} />
//       </TouchableOpacity>
//       <Text>Add New Contact</Text>
//       <TextInput placeholder="Name" value={name} onChangeText={setName} />
//       <TextInput placeholder="Mobile" value={mobile} onChangeText={setMobile} />
//       <TextInput placeholder="Landline" value={landline} onChangeText={setLandline} />
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
//       <Button title="Save" onPress={saveContact} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   favoriteIcon: {
//     position: 'absolute',
//     top: 2,
//     right: 10,
//     zIndex: 1, // Ensure the icon is clickable by setting the zIndex
//   },
// });
