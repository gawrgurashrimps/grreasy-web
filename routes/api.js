var express = require('express');
var router = express.Router();
const { query } = require('../utils/pool.js');



router.get('/', function(req, res, next) {
  const sql = 'SELECT * FROM items';
  query(sql).then(result => {
    res.json(result);
  });
});



module.exports = router;