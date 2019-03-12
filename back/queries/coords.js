const _db = require('../db')

function getDB(){
    _db.initDB()
    return _db.getDB()
  }

function getCoords(req,res,next){
    const db = getDB()

    db.any(`select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS where table_name = '${req.query.table}';`)
        .then( async columns=>{
            // console.log(columns)
            const columnData = await Promise.all(columns.map( el=> {

                if (el.data_type === "character varying") {
                    console.log(`select distinct ${el.column_name} from ${req.query.table} ;`)
                    return db.any(`select distinct ${el.column_name} from ${req.query.table} ;`)
                } else {
                    return db.one(`select min(${el.column_name}), max(${el.column_name}) from ${req.query.table};`)
                }
            }))
            columns = columns.map((el,i)=>{
                if (columnData[i].length){
                    columnData[i] = columnData[i].map(el=>{
                        // console.log(el)
                        // console.log(columns[i].column_name)
                        return el[columns[i].column_name]
                    })
                }
                return {...el, meta: columnData[i]}
            })

            console.log(columns)
            db.any(`select * from ${req.query.table};`)
            .then(rows=>{
                res.status(200).json({
                    rows,
                    columns
                })
            }).catch(e=>console.log(e))
        })
        .catch(e=>console.log(e))
}



module.exports={
    getCoords
}
// coordsTable({query:{table:"marathon"}})