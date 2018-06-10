var express = require('express');
var funcJS = require('../queryjs/function');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection/config');

router.get('/', function (req, res, next) {
    res.render('product/product');
});

//--- gruop -----//
router.get('/listgroup' ,async function (req, res, next) {
   // let data = await funcJS.selectFrom("group_product");
    res.render('product/group/group');
});

router.post('/addgroup',async function (req, res, next) {
    var data = { name: req.body['name']  , id : req.body['id'] };
    funcJS.insentData(data.name,data.id);
    res.redirect('/product/listgroup');
});

router.get('/deletegroup/:id',async function (req, res, next) {
    var id = req.params.id;
    funcJS.deleteData(id,"group_id","group_product");
    res.redirect('/product/listgroup');
});

router.get('/deleteProductId/:id' , async function (req,res,next){
	var id = req.params.id;
	funcJS.deleteData(id,"id_product","product");
	res.redirect('/product/listdetailproduct');
});





router.get('/listdetailproduct',async function (req, res, next) {
    let data = await funcJS.selectFrom("group_product");
    let office = await funcJS.selectFrom("office");
    let getproduct = await funcJS.selectRroductDetail();
    //res.send(getproduct);
    res.render('product/list/listdetail', { data : data , office : office , getproduct : getproduct});
    //res.send(data);
});

router.post('/insentdetailproduct' , async function(req,res,next){
    var data = {
        id_group : req.body['group_product'],
        name_product : req.body['name_product'],
        product_barcode : req.body['barcode'],
        price : req.body['price'],
        price_vat : req.body['price_vat'],
        group_office : req.body['office'],
        stock_product : req.body['stock_product'],
    }
    funcJS.insentDataProductAll(data);
    res.redirect('/product/listdetailproduct');
});


router.get('/listtableproduct', async function(req,res,next){
    let getproduct = await funcJS.selectRroductDetail();
    res.render('product/listproductall/all', {getproduct : getproduct});
});

module.exports = router;