const { query } = require('./pool.js');


function getProducts(params, callback) {
  if (process.env.DUMMY_DATA) {
    callback([{"product_id":1,"product_name":"Hass Avocado","origin_name":"Woolworths","product_price":1,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":2,"product_name":"Fresh Papple","origin_name":"Woolworths","product_price":1.24,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":3,"product_name":"Fresh Pink Lady Apples","origin_name":"Woolworths","product_price":0.77,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":4,"product_name":"Woolworths Carrots","origin_name":"Woolworths","product_price":2,"product_quantity":1000,"unit_name":"g","category_name":"foods"},{"product_id":5,"product_name":"Pumpkin Kent Cut","origin_name":"Woolworths","product_price":2.45,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":6,"product_name":"Fresh Tomato","origin_name":"Woolworths","product_price":0.54,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":7,"product_name":"Fresh Broccoli","origin_name":"Woolworths","product_price":1.49,"product_quantity":1,"unit_name":"each","category_name":"foods"},{"product_id":8,"product_name":"Woolworths Onion Brown P/p","origin_name":"Woolworths","product_price":1.5,"product_quantity":1000,"unit_name":"g","category_name":"foods"}]);
    return;
  }
  const searchFor = params.name || "";
  const orderBy = params.orderBy || "id";
  const orderDir = params.orderDir || "asc";
  const category = params.category || "";
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
    callback(result);
  });
}



module.exports = {
    getProducts: getProducts,
};
