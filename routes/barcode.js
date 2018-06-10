var  express = require('express');
var funcJS = require('../queryjs/function');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection/config');
var qr = require('qr-image');
var fs = require('fs');

router.get('/',function(req,res,next){
    //res.render('barcode/index');
});

module.exports = router;