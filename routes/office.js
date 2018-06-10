var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var funcJS = require('../queryjs/function');
var config = require('../connection/config');


router.get('/',async function (req, res, next) {
   let data = await funcJS.selectFrom('office');
   res.render('office/index',{ data : data });
});

router.get('/addoffice', function(rea,res,next){
    res.render('office/addoffice');
});

router.post('/insentoffice',function(req,res,nect){
    var data = { 
        offname_thai : req.body['name_thai'],
        offname_eng : req.body['name_eng'] ,
        off_tel : req.body['offtel'] ,
        off_tel1 : req.body['offtel1'] ,
        off_fex : req.body['offfex'] ,
        off_detail : req.body['detail'] ,
        user_contect : req.body['user']
    };
    funcJS.insentDataOfficeAll(data);
    res.redirect('/office');
});


module.exports = router;