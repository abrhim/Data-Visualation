const _db = require('../db')

function getDB(){
    _db.initDB()
    return _db.getDB()
  }

async function query(req,res,next){
    let queryString = `select * from ${req.query.table};`
    let value = ''
    let label = ''
    let x = ''
    let y = ''
    // let xLabel = ''
    // let yLabel = ''
    // console.log(req.query)
    //according to which button they push do coinciding sql statement
    switch(req.query.type) {
        case "Major Count" :{
            queryString=`select count(*),major from ${req.query.table} group by major;`
            value = `count`
            label=`major`
            break;
        }
        case "Home Area Count" :{
            queryString=`select count(*),area from ${req.query.table} group by area;`
            value = `count`
            label=`area`
            break;
        }
        case "Avg GPA by Major" : {
            queryString=`select avg(gpa),major from ${req.query.table} group by major;`
            value = `avg`
            label=`major`
            break;
        }
        case "Avg Credits Attempted" : {
            queryString=`select avg(credits_attempted),yeer from ${req.query.table} group by yeer;`
            value = `avg`
            label=`yeer`
            break;
        }
        case "Avg Credits Failed by Year" : {
            queryString=`select avg(credits_attempted - credts_passed),yeer from ${req.query.table} group by yeer;`
            value = `avg`
            label=`yeer`
            break;
        }
        case "Count of students by GPA" : {
            queryString=`select width_bucket(gpa,2.25,4.0,7) as buckets, count(*) from ${req.query.table} group by buckets order by buckets;`
            value = `count`
            label=`gpa`
            break;
        }
        case "Credits attempted vs Credits passed" : {
            queryString = `select * from ${req.query.table};`
            x = 'credits_attempted'
            y = 'credits_passed'
            break;

        }
        case "Credits attempted vs. GPA" : {
            queryString = `select * from ${req.query.table};`
            x = 'credits_attempted'
            y = 'GPA'        
            break;

        }
        case "Credits passed vs. GPA" : {
            queryString = `select * from ${req.query.table};`
            x = 'credits_passed'
            y = 'GPA'     
            break;
   
        }
        case "Age vs GPA" : {
            queryString = `select * from ${req.query.table};`
            x = 'age'
            y = 'GPA'   
            break;
     
        }
        case "Age vs Credits Attempted" : {
            queryString = `select * from ${req.query.table};`
            x = 'age'
            y = 'credits_attempted'   
            break;

        }
        default: break;
    }
    const db = getDB()
    console.log(req.query)
    console.log(queryString)
    try{
        let data = await db.any(queryString)
        // console.log(typeof(data))
        console.log(data)

        //change change the keys into value/labels
        if (req.query.type === 'Count of students by GPA'){
            //loop thru the data from the query, and increment each bin up as you compare it. 
            const returnValues = [
                '2.25-2.5',
                '2.5-2.75',
                '2.75-3',
                '3-3.25',
                '3.25-3.5',
                '3.5-3.75',
                '3.75-4.0',
            ]

            data = data.map((el,index)=>{
                return {...el, value: el[value], label: returnValues[index]}
                
                //sort the arrays by their labels
            }).sort((el1,el2)=>el1.label-el2.label)
            
        } else {

            data = data.map(el=>{
                if(req.query.table === 'cis2012')return {value: el[value], label: el[label]}
                if(req.query.table === 'cis2012_with_age')return {...el, x: el[x], y: el[y], xLabel: x, yLabel: y}
                //sort the arrays by their labels
            }).sort((el1,el2)=>{
                if(req.query.table === 'cis2012')return el1.label-el2.label
                if(req.query.table === 'cis2012_with_age')return el1.x-el2.x
            })

        }
        // console.log(data)

        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json(error)
        console.log(error)
    }
    // res.status(200).json({status:200,data:123})
}

module.exports={
    query,
}