var express = require('express');
var router = express.Router();
const { getProducts } = require('../utils/getProducts');



router.get('/getProducts', function(req, res, next) {
  getProducts(req.query, (data) => res.json(data));
});



module.exports = router;
