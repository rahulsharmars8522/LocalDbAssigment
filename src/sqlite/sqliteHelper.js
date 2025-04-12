import SQLite from 'react-native-sqlite-storage';

// Open SQLite database
const db = SQLite.openDatabase(
  { name: 'items.db', location: 'default' },
  () => {
    // console.log('Database opened successfully');
  },
  (error) => {
    console.error('Failed to open database:', error);
  }
);

/**
 * Creates the 'items' table if it doesn't already exist.
 */
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
      [],
      () => {
        // console.log('Table created or already exists');
      },
      (error) => {
        // console.error('Error creating table:', error);
      }
    );
  });
};

/** Inserts a new item into the 'items' table in the database. */
export const insertItemToDb = (name, description) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            // console.log(`Item inserted successfully with ID: ${result.insertId}`);
            resolve(result.insertId); // Resolve with the inserted item's ID
          } else {
            reject('Insertion failed'); // Reject if no rows were affected
          }
        },
        (error) => {
        //   console.error('SQL Error:', error);
          reject(error); // Reject on SQL error
        }
      );
    });
  });
};

/** Fetches all items from the 'items' table in the database. */
export const fetchItemsFromDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          resolve(items); // Resolve with the fetched items
        },
        (error) => {
        //   console.error('SQL Error:', error);
          reject(error); // Reject on SQL error
        }
      );
    });
  });
};

/** Deletes an item from the 'items' table based on the item ID. */
export const deleteItemFromDb = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?',
        [id],
        () => {
        //   console.log(`Item with ID ${id} deleted`);
          resolve(); // Resolve after item is deleted
        },
        (error) => {
        //   console.error('SQL Error:', error);
          reject(error); // Reject on SQL error
        }
      );
    });
  });
};

/**  Updates an existing item in the 'items' table based on the item ID. */
export const updateItemInDb = (id, name, description) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        () => {
        //   console.log(`Item with ID ${id} updated`);
          resolve(); // Resolve after item is updated
        },
        (error) => {
        //   console.error('SQL Error:', error);
          reject(error); // Reject on SQL error
        }
      );
    });
  });
};
