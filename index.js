const SQLiteManager = require('./SQLiteManager');

// Create a new SQLiteManager instance. This will create a new database file.
// It must be a valid relative path to a file.
const sqlite = new SQLiteManager({
    SQLiteFileLocation: './database.db'
});

console.log(sqlite.DatabaseFileExists()); // true. Database file exists.

// Drops the user table if exists.
const drop = sqlite.Query('DROP TABLE IF EXISTS users');
console.log(drop); // => { changes: 0, lastInsertRowid: 0, status: 'success', description: 'query successfully executed' }

// Creates the user table.
const create = sqlite.Query('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
console.log(create); // => { changes: 0, lastInsertRowid: 0, status: 'success', description: 'query successfully executed' }

// Checks if user table exists.
const tableExists = sqlite.Select(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`);
console.log(tableExists); // => [ { name: 'users' } ]

// Inserts a new user.
const insert = sqlite.Query(`INSERT INTO users (name, age) VALUES ('Joe', 9999)`);
console.log(insert); // => { changes: 1, lastInsertRowid: 1, status: 'success', description: 'query successfully executed' }

// Updates the inserted user.
const update = sqlite.Query(`UPDATE users SET age = 100 WHERE id = 1`);
console.log(update); // => { changes: 1, lastInsertRowid: 0, status: 'success', description: 'query successfully executed' }

// Checks if the user age is 100 by doing a select query.
const select = sqlite.Select(`SELECT * FROM users WHERE id = 1`);
console.log(select); // => [ { id: 1, name: 'Joe', age: 100 } ]

// ======================================================================================================

// Deletes the inserted user.
const deleteUser = sqlite.Query(`DELETE FROM users WHERE id = 1`);
console.log(deleteUser); // => { changes: 1, lastInsertRowid: 0, status: 'success', description: 'query successfully executed' }
//  Checks if the user is deleted.
const selectUser = sqlite.Select(`SELECT * FROM users WHERE id = 1`);
console.log(selectUser); // => []

// ======================================================================================================

// Deletes cats table if exists, creates cats table and inserts data
// from an existing .sql script file.
const cats = sqlite.QueryFromSqlFile('./cats.sql'); // => file must end in .sql
console.log(cats); // =>
/*
Database {
  name: './database.db',
  open: false,
  inTransaction: false,
  readonly: false,
  memory: false,
  status: 'success',
  description: 'SQL file successfully executed'
}
*/
