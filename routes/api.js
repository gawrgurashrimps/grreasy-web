var express = require('express');
var router = express.Router();
const { query } = require('../utils/pool.js');



router.get('/', function(req, res, next) {
  const searchFor = req.query.name || "";
  const orderBy = req.query.orderBy || "id";
  const orderDir = req.query.orderDir || "asc";
  const category = req.query.category || "";
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
        LOWER(i.name) LIKE LOWER(CONCAT('%', ?, '%')) AND
        LOWER(c.name) LIKE LOWER(CONCAT('%', ?, '%'))
    `;

  let orderSql = "ORDER BY ";
  switch (orderBy.toLowerCase()) {
    case "price":
      orderSql += "i.price"
      break;

    case "id":
    default:
      orderSql += "i.id";
      break;
  }
  orderSql += " ";
  switch (orderDir.toLowerCase()) {
    case "desc":
      orderSql += " DESC";
      break;

    case "asc":
    default:
      orderSql += "ASC";
      break;
  }

  const limitSql = "LIMIT 100";

  const finalSql = [sql, orderSql, limitSql].join(" ") + ";";
  query(
    finalSql,
    [
        searchFor,
        category,
    ]
  ).then(result => {
    res.json(result);
  });
});



module.exports = router;
