
var db = require('../db')
var csv = require('csvtojson')
var barchart_data = './cis2012.csv'
// 
//get db.
//read csv and for each line insert data.
let daData
csv()
.fromFile(barchart_data)
.then(data=>saveData(data))

function saveData (data){
    myDb = db.getDB()
    myDb.zero
    console.log(data)

}
// https://github.com/vitaly-t/pg-promise/issues/451
// https://stackoverflow.com/questions/37300997/multi-row-insert-with-pg-promise
