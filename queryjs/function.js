
var mysql = require('mysql');
var config = require('../connection/config');
var dateFormat = require('dateformat');


var loginUser = function(user, pass){
    return new Promise((resolve)=>{
        config.connect(function(err) {
            sql = "select * from member where username = '"+user+"' and password = '"+ pass+"'";
            config.query(sql, function(err,result){
                console.log(result);
                resolve(result)
             });
       });
    });
}

var selectFrom = function(nameFrom){
    return new Promise((resolve) => {
        config.connect(function(err) {
            sql = "select *from "+nameFrom;
            config.query(sql, function(err,result){
                resolve(result)
             });
       });
    })
}

var checkLoginUser =  function(){
    if(req.session.status == 1){
        
    }
}
var selectRroduct = function(){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "SELECT * FROM group_product";
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var selectRroductDetail = function(){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "SELECT product.stock_product , product.id_product, product.name_product, product.product_barcode ,group_product.group_name , office.offname_thai FROM ((product INNER JOIN group_product ON product.id_group = group_product.group_id ) INNER JOIN office ON product.group_office = office.id_office)";
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var countSelectFrom = function (nameFrom) {
    return new Promise((resolve) => {
        config.connect(function (err) {
            sql = "select COUNT(*) as max from "+nameFrom;
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var countSelectFrom = function (nameFrom ,field ,date) {
    return new Promise((resolve) => {
        config.connect(function (err) {
            sql = "select COUNT("+ field +") as max from "+nameFrom+" WHERE datetime LIKE '"+date.toString()+"%'";
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var SumPriceOrderToDay = function (datetime){
    return new Promise((resolve)=>{
        config.connect(function (err){
            sql = "SELECT listbuy.qty , product.price FROM listbuy INNER JOIN product on listbuy.id_product = product.id_product WHERE datetime LIKE '"+datetime+"%'";
            config.query(sql, function (err, result) {
                console.log(result);
                resolve(result);
            });
        });
    });
}

var searching = function (nameFrom) {
    return new Promise((resolve) => {
        config.connect(function (err) {
            sql = "select * from product WHERE 	name_product LIKE '%"+nameFrom+"%'";
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var maxSelectFrom = function (nameFrom, field) {
    return new Promise((resolve) => {
        config.connect(function (err) {
            sql = "select max("+ field +") as max from "+nameFrom;
            config.query(sql, function (err, result) {
                resolve(result);
            });
        });
    });
}

var selectFromId = function(nameFrom , selectIdfild , id){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "select *from "+nameFrom+" where "+selectIdfild + " = '"+ id +"'";
            config.query(sql , function(err, result){
                    resolve(result);
            });
        });
    });
}

var  updateDataBill = function(nameFrom){
    return new Promise((resolve) =>{
		
            sql = "update select_bill set name_office='"+nameFrom[0].name_office+"' , receipt_number='"+nameFrom[0].receipt_number+"' ,title_header='"+nameFrom[0].title_header+"' , address='"+nameFrom[0].address+"'	, detail1='"+nameFrom[0].detail1+"' , detail2='"+nameFrom[0].detail2+"'	where id_select_bill = '1'";
            config.query(sql, function (err, result) {
                if (err) {
                    console.log("err" + err);
                }
                resolve('OK');

            });
			
			//console.log(nameFrom[0].name_office);
    });
}


var  insentData = function(nameFrom , id){
    return new Promise((resolve) =>{
        if(id != ''){
            sql = "update group_product set group_name='"+nameFrom+"' where group_id = '"+ id+"'";
            config.query(sql, function (err, result) {
                if (err) {
                    console.log("err" + err);
                }
                resolve('OK');

            });

        }else{
             config.connect(function(err) {
                sql = "insert into group_product (group_name) values('" + nameFrom + "')";
                config.query(sql, function (err, result) {
                    if (err) {
                        console.log("err" + err);
                    }
                    resolve('OK');
                });
            });
        }
    });
}
var insentDataProductAll = function(arr){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "insert into product (id_group,name_product,product_barcode,price,price_vat,group_office,stock_product)"; 
                sql1 = "values ('"+arr.id_group+"','"+arr.name_product+"','"+arr.product_barcode+"','"+arr.price+"','"+arr.price_vat+"','"+arr.group_office+"','"+arr.stock_product+"')" 
                sql = sql + sql1;
                config.query(sql, function (err, result) {
                    if (err) {
                        console.log("err" + err);
                    }
                    resolve('OK');
                });
        });
    });
};

var insentDataOfficeAll = function(arr){
    return new Promise((resolve)=>{
        config.connect(function(err){
                sql = "insert into office (offname_thai,offname_eng,off_tel,off_tel1,off_fex,off_detail,user_contect)"; 
                sql1 = "values ('"+arr.offname_thai+"','"+arr.offname_eng+"','"+arr.off_tel+"','"+arr.off_tel1+"','"+arr.off_fex+"','"+arr.off_detail+"','"+arr.user_contect+"')" 
                sql = sql + sql1;
                config.query(sql, function (err, result) {
                    if (err) {
                        console.log("err" + err);
                    }
                    resolve('OK');
                });
        });
    });
};

var deleteData = function (id,field,nameFrom){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "delete from "+ nameFrom +" where "+ field + " = '"+id+"'";
            config.query(sql, function (err, result) {
                if (err) {
                    console.log("err" + err);
                }
                resolve('OK');
            });
        });
    });
}



///----------------  office ----------
var insentDataOffice = function(nameFrom , id){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "insert into office () values('" + nameFrom + "')";
        });
    });
} 


//-------------  buy ------------
var insentDataBillProduct = function(idbill ,pay , item  , price , withdraw){
    return new Promise((resolve)=>{
        config.connect(function(err){

                sql = "select * from bill where id_bill = '"+idbill+"'";
                config.query(sql, function (err ,result) {
                    if (result == '') {
                        sql = "insert into bill (price,pay,withdraw) values('"+ price+"', '"+ pay+"','"+ withdraw +"')";
                            config.query(sql, function (err, result) {
                                if (err) {
                                    console.log("err" + err);
                                }
                            });
                       
                         for(i=0;i<item.length;i++){
                                console.log("ID product : "+ item[i].item.id_product);
                                console.log("Qty"+item[i].qty);
                                sql = "insert into listbuy (id_bill,id_product,qty) values('"+ idbill +"', '"+ item[i].item.id_product+"', '"+item[i].qty+"')";
                                config.query(sql, function (err, result) {
                                    if (err) {
                                        console.log("err" + err);
                                    }
                                });
                            }
                            resolve('OK');
                            
                      }else{
                          resolve('OK');
                      }
               });
        });
    });
}


var selectJoinFromBill =  function(id){
    return new Promise((resolve)=>{
        config.connect(function(err){
            sql = "SELECT product.name_product , product.price ,product.product_barcode , listbuy.qty FROM listbuy INNER JOIN product on listbuy.id_product = product.id_product WHERE listbuy.id_bill = '"+id+"'";
            config.query(sql , function(err, result){
                    resolve(result);
            });
        });
    });
} 

var CoverDatetimeYMDHMS =  function(datetime){
    return new Promise((resolve)=>{
        resolve(dateFormat(datetime, "dd-mm-yyyy h:MM:ss"));
    });

} 

var CoverDatetimeYMD =  function(datetime){
    return new Promise((resolve)=>{
        resolve(dateFormat(datetime, "dd-mm-yyyy"));
    });
} 

var selectFromIddmy = function(date){
    return new Promise((resolve) => {
        config.connect(function(err) {
            sql = "SELECT * FROM bill WHERE datetime LIKE '"+date.toString()+"%'";
            config.query(sql, function(err,result){
                //console.log(result);
                resolve(result)
             });
       });
    })
}

var getDateTime = function(){
    return new Promise((resolve)=>{
        var d = new Date();
        resolve(dateFormat(d, "yyyy-mm-dd"));
    });
}

var getpriceToday = function(){
    return new Promise((resolve)=>{

    });
};




module.exports.selectFrom = selectFrom;
module.exports.insentData = insentData;
module.exports.deleteData = deleteData;
module.exports.selectFromId = selectFromId;
module.exports.insentDataProductAll = insentDataProductAll;
module.exports.insentDataOfficeAll = insentDataOfficeAll;
module.exports.countSelectFrom = countSelectFrom;
module.exports.insentDataBillProduct =insentDataBillProduct;
module.exports.selectJoinFromBill = selectJoinFromBill;
module.exports.CoverDatetimeYMDHMS = CoverDatetimeYMDHMS;
module.exports.CoverDatetimeYMD = CoverDatetimeYMD;
module.exports.selectFromIddmy = selectFromIddmy;
module.exports.getDateTime = getDateTime;
module.exports.maxSelectFrom = maxSelectFrom;
module.exports.selectRroductDetail = selectRroductDetail;
module.exports.loginUser =loginUser;
module.exports.searching = searching;
module.exports.SumPriceOrderToDay = SumPriceOrderToDay;
module.exports.selectRroduct = selectRroduct;
module.exports.updateDataBill = updateDataBill;