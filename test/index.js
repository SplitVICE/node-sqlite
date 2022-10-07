const assert = require('assert')

const SQLiteManager = require('../SQLiteManager.js')
let sqlite = null

function DeleteTestDatabase() {
    require('fs').rmSync('./test_database.db')
}

// Loads settings from settings.json file.
const Settings = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, './settings.json')))

describe('SQLiteManager tests', () => {
    describe('Database file', () => {
        it('Create from instance', () => {
            // Instance of SQLiteManager creates a database file.
            sqlite = new SQLiteManager({ SQLiteFileLocation: './test_database.db' })
        })
        it('Database exists', () => {
            const dbExists = sqlite.DatabaseFileExists() // Expect true.
            assert(dbExists, 'Database does not exist.') // If false, throw error.
        })
        it('Error check: database not found', async () => {
            DeleteTestDatabase()

            const dbExists = sqlite.DatabaseFileExists() // Expect false.
            assert(!dbExists, 'Database exists and should not.')
        })
    })
    describe('Tables', () => {
        it('Create table and add items from .sql file', () => {
            const res = sqlite.QueryFromSqlFile(require('path').join(__dirname, '../cats.sql'))
            assert(res.status == 'success', res.description == "SQL file successfully executed",
                'Failed to execute a .sql file.')
        })
        it('SELECT query using Select function', () => {
            // Table CAT created in previous test is used.
            const selectAll = sqlite.Select('SELECT * FROM CAT')
            const selectWithWhere = sqlite.Select('SELECT * FROM CAT WHERE ID = 3')
            const selectWithNoResult = sqlite.Select('SELECT * FROM CAT WHERE ID = 9999')
            const selectNoExistingTable = sqlite.Select('SELECT * FROM INKI')

            assert(
                selectAll.length == 4 &&
                selectWithWhere.length == 1 &&
                selectWithWhere[0].NAME == 'Scratchy' &&
                selectWithNoResult.length == 0 &&
                selectNoExistingTable.status == 'failed' &&
                selectNoExistingTable.description.includes('no such table: INKI'),
                "Failed a SELECT"
            )
        })
        describe('Generic queries using Query function', () => {
            describe('Generic queries using Query function', () => {
                it('Insert items', () => {
                    const res = sqlite.Query("INSERT INTO CAT (NAME, BIRTH_DATE) VALUES ('Mittens', '2001-01-01')")
                    assert(res.changes === 1 &&
                        res.lastInsertRowid === 5 &&
                        res.status === 'success' &&
                        res.description === 'query successfully executed'
                        , 'Failed to insert item.')
                })
                it('Update items', () => {
                    const res = sqlite.Query("UPDATE CAT SET NAME = 'Mittens Roberts' WHERE ID = 5")
                    const sel = sqlite.Select("SELECT * FROM CAT WHERE ID = 5")
                    assert(res.changes === 1 &&
                        res.lastInsertRowid === 0 &&
                        res.status === 'success' &&
                        res.description === 'query successfully executed' &&
                        sel[0].NAME === 'Mittens Roberts'
                        , 'Failed to update item.')
                })
                it('Delete items', () => {
                    sqlite.Query("DELETE FROM CAT WHERE ID = 5")
                    const sel = sqlite.Select("SELECT * FROM CAT WHERE ID = 5")
                    assert(sel.length === 0, 'Failed to delete item.')
                })
                // It is assummed any other query will work.
            })
        })
    })
    describe('Test close', () => {
        it('Removes test database', () => {
            // Removing the database file prevents errors if tests are ran again.
            if (Settings.DeleteTestsDatabaseOnTestFinish === true) DeleteTestDatabase()
            assert(!require('fs').existsSync(require('path').join(__dirname, '../test_database.db')),
                'Database file still exists.'
            )
        })
    })
})
