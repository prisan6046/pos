var mysql = require('mysql');

/*
var config = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "pos"
});
*/

/*
var config = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "wenwen6046",
    database : "pos"
});
*/



var config = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "project",
    database : "pos"
}); 






module.exports = config;
