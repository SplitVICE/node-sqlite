# Node SQLite

Simple class API to execute SQLite sentences.

It is required to install `better-sqlite3` module to use this API class.

This API class works with better-sqlite3 version 7.6.2.

## API

Require SQLiteManager class:

```javascript
const SQLiteManager = require('./SQLiteManager');

// Create a new SQLiteManager instance. This will create a new database file.
// It must be a valid relative path to a file.
const sqlite = new SQLiteManager({
    SQLiteFileLocation: './database.db'
});
```

Typical CRUD examples:

```javascript
// Drops the user table if exists.
const drop = sqlite.Query('DROP TABLE IF EXISTS users');
console.log(drop); // => { changes: 0, lastInsertRowid: 0 }

// Creates the user table.
const create = sqlite.Query('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
console.log(create); // => { changes: 0, lastInsertRowid: 0 }

// Checks if user table exists.
const tableExists = sqlite.Select(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`);
console.log(tableExists); // => [ { name: 'users' } ]

// Inserts a new user.
const insert = sqlite.Query(`INSERT INTO users (name, age) VALUES ('Joe', 9999)`);
console.log(insert); // => { changes: 1, lastInsertRowid: 1 }

// Updates the inserted user.
const update = sqlite.Query(`UPDATE users SET age = 100 WHERE id = 1`);
console.log(update); // => { changes: 1, lastInsertRowid: 1 }
// Checks if the user age is 100.
const select = sqlite.Select(`SELECT * FROM users WHERE id = 1`);
console.log(select); // => [ { id: 1, name: 'Joe', age: 100 } ]

// ======================================================================================================

// Deletes the inserted user.
const deleteUser = sqlite.Query(`DELETE FROM users WHERE id = 1`);
console.log(deleteUser); // => { changes: 1, lastInsertRowid: 1 }
//  Checks if the user is deleted.
const selectUser = sqlite.Select(`SELECT * FROM users WHERE id = 1`);
console.log(selectUser); // => []
```

Check if database exists:

```javascript
console.log(sqlite.DatabaseFileExists()); // true. Database file exists.
```