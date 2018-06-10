
var express = require('express');
var funcJS = require('../queryjs/function');
var Cart = require('../queryjs/cart');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection/config');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var requestIp = require('request-ip');
var pageScope;

router.get('/',async function(req,res,next){
    var sum = 0;
    var order = 0;
    var date = await funcJS.getDateTime();
    let SumPrice = await funcJS.SumPriceOrderToDay(date);
	let coverDatetime = await funcJS.CoverDatetimeYMD(date);
    for(i=0;i<SumPrice.length; i++){
       sum = parseInt(sum) + (parseInt(SumPrice[i].qty) * parseInt(SumPrice[i].price));
       order = parseInt(order)+parseInt(SumPrice[i].qty);
    }

    var date = await funcJS.getDateTime();
    let max = await funcJS.maxSelectFrom("bill","id_bill");
    let count = await funcJS.countSelectFrom("bill","id_bill" , date);
    let data = await funcJS.selectFromId("select_bill","id_select_bill",1);
try{
    var cart = new Cart(req.session.cart);
    res.render('buy/buy' , { layout: 'layoutbuy' , products : cart.generateArray() ,orderbills : count[0].max, totalQty : cart.totalQty ,datetime : coverDatetime , totalPrice : cart.totalPrice , bills : (max[0].max+1) , data : data , Sumtoday : sum , ordertoday : order , ip : requestIp.getClientIp(req)});
}
catch (e) {
    res.render('buy/buy', { layout: 'layoutbuy' , products : null , totalPrice : 0, orderbills : count[0].max ,totalQty : 0 ,bills : (max[0].max+1) ,datetime : coverDatetime , data : data,Sumtoday : sum, ordertoday : order , ip : requestIp.getClientIp(req)});
  }
  
});

router.post('/add-cart',async function(req,res,next){
    var id = req.body['id'];
    try {
        var cart = new Cart(req.session.cart ? req.session.cart : { item : {}});
        let data = await funcJS.selectFromId("product", "product_barcode", id);
            var price =data[0].price.toString();
            cart.add({
                id_product : data[0].id_product,
                name : data[0].name_product,
                barcode : data[0].product_barcode,
                price : data[0].price.toString()
            }, id, price);
            req.session.cart = cart;
            console.log(req.session.cart );
            res.redirect('/buy'); 
      }
      catch (e) {
        res.redirect('/buy'); 

      }
});

router.post('/add-cart/addnumberorder',async function(req,res,next){
    var id = req.body['id'];
    var numberorder = req.body['numberorder'];
    try {
           
            var cart = new Cart(req.session.cart ? req.session.cart : { item : {}});
            let data = await funcJS.selectFromId("product", "product_barcode", id);
                 var price =data[0].price.toString();
                    cart.addOrder({
                        id_product : data[0].id_product,
                        name : data[0].name_product,
                        barcode : data[0].product_barcode,
                        price : data[0].price.toString()
                    }, id, numberorder,price);

            req.session.cart = cart;
            res.redirect('/buy'); 
      }
      catch (e) {
        res.redirect('/buy'); 

      }
});

/*
router.post('/add-cart-search',async function(req,res,next){
    var id = req.body['barcode'];
    //res.send(id);
  try {
        var cart = new Cart(req.session.cart ? req.session.cart : { item : {}});
        let data = await funcJS.selectFromId("product", "product_barcode", id);
            var price =data[0].price.toString();
            cart.add({
                id_product : data[0].id_product,
                name : data[0].name_product,
                barcode : data[0].product_barcode,
                price : data[0].price.toString()
            }, id, price);
            req.session.cart = cart;
            res.redirect('/buy'); 
      }
      catch (e) {
        res.redirect('/buy'); 

      }
});
*/

router.post('/createbill',async function(req,res,next){
    var id = req.body['id_bill'];
    var price = req.body['price'];
    var withdraw = req.body['withdraw']
    var cart = new Cart(req.session.cart);
    var data = cart.generateArray();
   funcJS.insentDataBillProduct(id,cart.totalPrice , data , price , withdraw);
   res.send("OK");
});

router.get('/clr', function(req,res,next){
   req.session.destroy(function(err){
        if(err) {
            console.log(err);
          } else {
            res.redirect('/buy');
          }
    });
  
});


// --------------------   listorder ----------------
router.get('/listorder' ,async function(req,res,next){
    var date = await funcJS.getDateTime();
    var select = await funcJS.selectFromIddmy(date);
    let data = await funcJS.selectFromIddmy("bill","datetime");
    if(data == null){
        res.render('buy/listorder', { layout: 'layoutbuy' , bills : null });
    }else{
        res.render('buy/listorder', { layout: 'layoutbuy' , bills : select });
    }
       
});

router.get('/getordername/:name', async function(req,res,next){
    var name = req.params.name;
    let data = await funcJS.searching(name);
    res.json(data);
    //res.send(name);
});

router.get('/getorderId/:id',async function(req,res,nect){
    var id = req.params.id;
    let dataBill  = await funcJS.selectFromId('bill','id_bill', id);
    let dataOrder = await funcJS.selectJoinFromBill(id);
    //let dataOrder = await funcJS.selectFromId('listbuy','id_bill', id);
    var aip = [{
        idbill : dataBill[0].id_bill,
        pay : dataBill[0].pay,
        price : dataBill[0].price,
        withdraw : dataBill[0].withdraw,
        datetime : await funcJS.CoverDatetimeYMDHMS(dataBill[0].datetime),
        item : dataOrder
    }];
    
    //console.log(dataBill);
    console.log(dataOrder);
    res.send(JSON.stringify(aip));
});


module.exports = router;