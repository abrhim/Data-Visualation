var express = require('express');
var router = express.Router();
const queries = require("../queries/Queries.js")

/* GET home page. */
// router.get('/', queries.selectAll);
router.get('/selectall',queries.selectAll)
router.get('/sqlfun',queries.sqlfun)
// router.get('/select',queries.selectAll)


module.exports = router;
