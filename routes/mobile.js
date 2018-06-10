var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var funcJS = require('../queryjs/function');
var config = require('../connection/config');


router.get('/',async function (req, res, next) {
  var sum = 0;
  var order = 0;
  var date = await funcJS.getDateTime();
  let SumPrice = await funcJS.SumPriceOrderToDay(date);
  let count = await funcJS.countSelectFrom("bill","id_bill" , date);
  for(i=0;i<SumPrice.length; i++){
     sum = parseInt(sum) + (parseInt(SumPrice[i].qty) * parseInt(SumPrice[i].price));
     order = parseInt(order)+parseInt(SumPrice[i].qty);
  }
  res.render('mobile/index' , { layout : 'mobile/layout' ,orderbills : count[0].max,  Sumtoday : sum , ordertoday : order });
});


module.exports = router;