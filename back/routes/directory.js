var express = require('express');
var router = express.Router();

router.get('/directory',getDirectory)

function getDirectory(req,res,next){
    console.log(req.query.directory)
    res.status(200).json({
        data: req.query.directory
    })
}

module.exports = router