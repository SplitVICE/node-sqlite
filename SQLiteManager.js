/*****************************************************************
Simple JS class interface for SQLite3 using better-sqlite3 module.
Version 2.0.0.
NPM module: better-sqlite3 version 7.6.2.
Repository: https://github.com/splitvice/node-sqlite
2022, SPLIT VICE - MIT.
*****************************************************************/

module.exports = class SQLite {
    /**
     * @param {String} options.SQLiteFileLocation location of database file.
     */
    constructor(options) {
        // Relative path of database file location.
        this.SQLiteFileLocation = options.SQLiteFileLocation;
        // Creates the database file if does not exist.
        this.core = require('better-sqlite3')(options.SQLiteFileLocation);
        // Closes connection.
        this.core.close();
    }

    /**
     * Generic query function.
     * Can execute INSERT, UPDATE, DELETE, CREATE, DROP, etc.
     * SELECT query is not supported. Use Select function instead.
     * @param {String} _query Insert string to execute.
     * @returns {Object} Result of insert query.
     * @return {Object} 
     * Example output success:
     *                   { 
     *                      changes: 1,
     *                      lastInsertRowid: 5
     *                      status: 'success',
     *                      description: 'query successfully executed'
     *                   }
     * Example output failed: 
     *                  {
     *                      status: 'failed',
     *                      description: 'An error ocurred: <error details>'
     *                  }
     */
    Query(_query) {
        try {
            this.core = require('better-sqlite3')(this.SQLiteFileLocation);
            const stmt = this.core.prepare(_query);
            const info = stmt.run();
            this.core.close();
            info.status = 'success';
            info.description = 'query successfully executed';
            return info;
        } catch (error) {
            this.core.close();
            return {
                status: 'failed',
                description: `An error ocurred: ${error.toString()}`
            };
        }
    }

    /**
     * Executes a script file in file system.
     * Format of the SQL script file must be .sql.
     * @param {String} filePath path of the script file.
     * @returns {Object} 
     * Example output success:
     *                 Database {
     *                      status: 'success',
     *                      description: 'SQL file successfully executed'
     *                      name: './database.db',
     *                      open: true,
     *                      inTransaction: false,
     *                      readonly: false,
     *                      memory: false
     *                  }
     *  Example output failed: 
     *                  {
     *                      status: 'failed',
     *                      description: 'An error ocurred: <error details>'
     *                  }
     */
    QueryFromSqlFile(filePath) {
        try {
            this.core = require('better-sqlite3')(this.SQLiteFileLocation);
            const res = this.core.exec(require('fs').readFileSync(filePath, 'utf8'));
            this.core.close();
            res.status = 'success';
            res.description = 'SQL file successfully executed';
            return res;
        } catch (error) {
            this.core.close();
            return {
                status: 'failed',
                description: `An error ocurred: ${error.toString()}`
            }
        }
    }

    /**
     * Generic SELECT query function.
     * @param {String} _query SELECT string to execute.
     * @returns {Object} Result of select query.
     * @return {Array | Object} 
     * Example output success:
     *                  [ 
     *                      { id: 1, name: 'Jane', age: 11 },
     *                      { id: 2, name: 'Jesse', age: 33 },
     *                      { id: 3, name: 'John', age: 30 }, 
     *                      ...
     *                  ]
     *                  Note: empty array if no registries on table found.
     * Example output failed:
     *                  {
     *                      status: 'failed',
     *                      description: 'An error ocurred: <error details>'
     *                  }
     *                  Note: error is thrown if table does not exist.
     */
    Select(_query) {
        try {
            this.core = require('better-sqlite3')(this.SQLiteFileLocation);
            const res = this.core.prepare(_query).all();
            this.core.close();
            return res;
        } catch (error) {
            this.core.close();
            return {
                status: 'failed',
                description: `An error ocurred: ${error.toString()}`
            }
        }
    }

    /**
     * Checks if the database file exists.
     * @returns {Boolean} true if database file exists. false otherwise.
     */
    DatabaseFileExists() {
        return require('fs').existsSync(this.SQLiteFileLocation);
    }
};
