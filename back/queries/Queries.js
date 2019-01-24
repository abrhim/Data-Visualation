// const queryString = require('query-string')
var _db = require("../db")

function getDB(){
    _db.initDB()
    return _db.getDB()
  }

function selectAll(req,res,next){
    console.log(req.query)
    const db = getDB()
    db.any("select * from marathon")
    .then(data=>{
        res.status(200).json({
            status:200,
            data
        })
    })
}

function sqlfun(req,res,next){
    let {ageSign, ageValue, hoursSign, hoursValue, gender} = req.query
    console.log(req.query)
    let queryString = "select * from marathon"
    if (ageValue || hoursValue || gender){
        queryString = queryString.concat(" where")

        if (ageValue) {
            console.log(ageValue)
            queryString = queryString.concat(` age ${ageSign} ${ageValue} AND`)
        }

        if (hoursValue) {
            console.log(hoursValue)
            queryString = queryString.concat(` hours ${hoursSign} ${hoursValue} AND`)
        }

        if (gender){
            console.log(gender)
            queryString = queryString.concat(` gender = '${gender}'`)
        }
    }
    queryString = queryString.concat(';')

    const regex = /AND;/
    queryString = queryString.replace(regex, ';')
    
    const db = getDB()
    db.any(queryString)
    .then(data=>{
        res.status(200).json({
            status:200,
            data,
            queryString
        })
    }).catch(err=>{
        res.status(404).json({
            status:400,
            err,
            queryString
        })
    })

}


module.exports={
    selectAll,
    sqlfun
}