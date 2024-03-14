//src//database//Database.js
import { openDatabase } from "react-native-sqlite-storage";

let db = openDatabase({name: 'contacts.db'});


export const initializeDatabase = () => {
  console.log('Initializing database...');
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, landline TEXT, photo TEXT, favorite INTEGER);'
  );
    });
  };