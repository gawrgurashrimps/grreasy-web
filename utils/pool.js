
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'products',
  connectionLimit: 10,
  supportBigNumbers: true
});

function query(sql, args) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        return reject(err);
      }
      connection.query(sql, args, function(err, result) {
        connection.release();
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
}

module.exports = {
  query
};
