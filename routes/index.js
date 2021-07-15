var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grreasy' });
});

router.get('/list', function(req, res){
  res.render('list', {
    title: 'List'
  });
});

router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

router.get('/bestlist', function(req, res){
  res.render('bestlist', {
    title: 'BestList'
  });
});


module.exports = router;
