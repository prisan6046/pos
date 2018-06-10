
var express = require('express');
var funcJS = require('../queryjs/function');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection/config');
var session = require('express-session');

router.get('/',function(req,res,next){
    res.render('menu', { title: 'my other page', layout: false });
    //res.redirect('/buy');
});
/*
router.get('/testapi',function(req,res,next){
    res.render('testapi', { title: 'my other page', layout: false });
});
*/

router.get('/home', function (req, res, next) {
    res.render('login', { title: 'Express' , layout: false});
});

router.post('/login',async function(req,res,next){
    var arr = [{
        user : req.body['username'],
        pass : req.body['password'],
    }];
    var check =await funcJS.loginUser(req.body['username'],req.body['password']);
    req.session.name = check[0].username;
    req.session.status = check[0].status;
    //res.send(req.session.status + " : "+ req.session.name);
    res.redirect('/admin');
});
/*

router.use(function(req,res,next){
    if(req.session.status == 1){
        res.redirect('/admin');
    }else{
        res.redirect('/home');
    }
})*/

router.get('/admin' , function(req,res,next){
     //console.log( req.session.name);
    res.render('index',{ title: 'Express'});
});
router.get('/admin/logout', function(req,res,next){
    req.session.destroy(function(err){
         if(err) {
             console.log(err);
           } else {
             res.redirect('/');
           }
     });
   
 });
router.get('/admin/buy' ,async function(req,res,next){
    let data = await funcJS.selectFrom('bill');
    
    res.render('admin/buy/index',{ title: 'Express', data : data });
});
router.get('/admin/titlebill' , async function(req,res,next){
    let data = await funcJS.selectFromId("select_bill","id_select_bill",1);
    //console.log(data);
    res.render('admin/bill/index' , {data : data});
});

router.post('/admin/titlebill',async function(req,res,next){
    var updateDataBill = [{
        name_office : req.body['name_office'],
        receipt_number : req.body['receipt_number'],
		title_header : req.body['title_header'],
        address : req.body['address'],
		detail1 : req.body['detail1'],
        detail2 : req.body['detail2'],
    }];
	//console.log(arr);
	//res.sent(arr);
	
    var check =await funcJS.updateDataBill(updateDataBill);
    res.redirect('/admin/titlebill');
	
});

/*
router.get('/admin/titlebill' , async function(req,res,next){
    let data = await funcJS.selectFromId("select_bill","id_select_bill",1);
    //console.log(data);
    res.render('admin/bill/index' , {data : data});
});
*/









module.exports = router;
