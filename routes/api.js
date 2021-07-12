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

// conn.connect(function(err){
//     if (err) throw err;
//     conn.query("SELECT * FROM items", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });


/* GET home page. */
router.get('/', function(req, res, next) {
    conn.connect(function(err){
        if (err) throw err;
        conn.query("SELECT * FROM items", function (err, result, fields) {
          if (err)throw err;
        res.json(result);
        });
      });
  
  //res.send('respond with a resource');
});


// router.listen(3001, function () {
//     console.log('Express server is listening on port 3001');
// });

module.exports = router;
