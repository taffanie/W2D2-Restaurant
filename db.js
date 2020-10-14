const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:')
// const db = new sqlite3.Database('db.sqlite') // use this for testing 

module.exports = db 