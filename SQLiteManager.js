/********************************************************
Custom API to access SQLite database and handle data.
Version 1.0.0.
NPM module: better-sqlite3 version 7.6.2.
Copyright (c) 2022, SPLIT VICE - MIT.
********************************************************/

module.exports = class SQLite {
    /**
     * @param {String} options.SQLiteFileLocation location of database file.
     */
    constructor(options) {
        // Relative path of where the dataabase file is located.
        this.SQLiteFileLocation = options.SQLiteFileLocation;
        // Automatically creates the database file.
        this.core = require('better-sqlite3')(options.SQLiteFileLocation);
    }

    /**
     * Generic query function.
     * Can execute INSERT, UPDATE, DELETE, CREATE, DROP, etc.
     * @param {String} _query Insert string to execute.
     * @returns {Object} Result of insert query.
     * @returnExample { changes: 1, lastInsertRowid: 5 }
     */
    Query(_query) {
        const stmt = this.core.prepare(_query);
        const info = stmt.run();
        return info;
    }

    /**
     * Generic SELECT query function.
     * @param {String} _query SELECT string to execute.
     * @returns {Object} Result of select query.
     * @returnExample [ { id: 1, name: 'Jane', age: 11 },
                        { id: 2, name: 'Jesse', age: 33 },
                        { id: 3, name: 'John', age: 30 }, ...]
     */
    Select(_query) {
        return this.core.prepare(_query).all();
    }

    /**
     * Checks if the database file exists.
     * @returns {Boolean} true if database file exists.
     */
    DatabaseFileExists() {
        return require('fs').existsSync(this.SQLiteFileLocation);
    }
};
