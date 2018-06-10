var express = require('express');
var request = require('request');
var router = express.Router();
var mysql = require('mysql');
var funcJS = require('../queryjs/function');
var config = require('../connection/config');


router.get('/', function (req, res, next) {
   res.send('YES');
});


router.get('/selectGroupProduct',async function(req,res,next){
    let data = await funcJS.selectRroduct("group_product");
    res.send(JSON.stringify(data));
});

router.get('/selectGetIdfromgroup/:id', async function (req, res, next) {
    var id = req.params.id;
    let data = await funcJS.selectFromId("group_product", "group_id", id);
    res.send(JSON.stringify(data));
});



router.get('/selectOfficeId/:id' , async function(req,res,next){
    var id = req.params.id;
    let data = await funcJS.selectFromId("office", "id_office", id);
    res.send(JSON.stringify(data));
});

router.get('/notify' , function(req,res,next){
    var token = "9ITIcthMuIrMxYcsqX8aOAk6MUBB9Dh2ywJQXIKmVRZ";
    var message = "ผกก หัวควย เมื่อไรจะคืนตังกู !!";

    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            'bearer': token
        },
        form: {
            message: message
        }
    }, (err, httpResponse, body) => {
        if(err){
            console.log(err);
        } else {/*
            res.json({
                httpResponse: httpResponse,
                body: body
            });
            */
            console.log('OK');
            res.redirect('/');
        }
    });
});
module.exports = router;