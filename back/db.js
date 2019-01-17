var pgp = require('pg-promise')()
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'data_vis',
}

let _db

function initDB(callback){
    if(_db){
        console.warn("Trying to init db again")
        return null
    }
    _db = pgp(cn);  
}

function getDB(callback){
    if(_db){
        return _db
    }
    console.warn("No db - must be initiated first.")
}

module.exports = {
    getDB: getDB, 
    initDB: initDB
}