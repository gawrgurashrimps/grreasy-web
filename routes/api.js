var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port: 3306,
    password : 'root',
    database : 'new_schema'
});
router.get('/', function(req, res, next) {
    conn.connect(function(err){
        if (err) throw err;
        conn.query("SELECT * FROM items", function (err, result, fields) {
          if (err)throw err;
        res.json(result);
        });
      });  
});

module.exports = router;
