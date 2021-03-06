var express = require('express');
var router = express.Router();
const queries = require("../queries/Queries.js")
const barchart = require("../queries/Barchart.js")
const coords = require("../queries/coords.js")


/* GET home page. */
// router.get('/', queries.selectAll);
router.get('/selectall',queries.selectAll)
router.get('/sqlfun',queries.sqlfun)
router.get('/barchart',barchart.query)
router.get('/scatterplot',barchart.query)
router.get('/coords',coords.getCoords)
// router.get('/select',queries.selectAll)


module.exports = router;
