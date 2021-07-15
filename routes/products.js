var express = require('express');
var router = express.Router();
const { getProducts } = require('../utils/getProducts');

router.get('/', function(req, res){
  getProducts(req.query, (products) => {
    res.render('products', {
      products: products
    });
  });
});

module.exports = router;


