USE products;

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
ORDER BY i.id;
