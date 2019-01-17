var _db = require("../db")


function getDB(){
    _db.initDB()
    return _db.getDB()
  }

function selectAll(req,res,next){
    const db = getDB()
    // console.log(req)
    db.any("select * from marathon")
    .then(data=>{
        res.status(200).json({
            status:200,
            data
        })
    })
    console.log("hey brados")
}



module.exports={
    selectAll
}