var express = require('express');
var router = express.Router();
const { query } = require('../utils/pool.js');



router.get('/', function(req, res, next) {
  const searchFor = req.query.name || "";
  const sql =
    `
    SELECT
        i.id AS product_id,
        i.name AS product_name,
        o.name AS origin_name,
        i.price AS product_price,
        i.quantity AS product_quantity,
        u.name AS unit_name,
        c.name AS category_name
    FROM
        items i JOIN origin o ON (i.origin_id = o.id)
        JOIN unit u ON (i.fk_unit = u.id)
        JOIN category c ON (i.fk_category = c.id)
    WHERE
        LOWER(i.name) LIKE LOWER(CONCAT('%', ?, '%'))
    ORDER BY i.id
    LIMIT 100;
    `;
  query(
    sql,
    [
        searchFor
    ]
  ).then(result => {
    res.json(result);
  });
});



module.exports = router;
