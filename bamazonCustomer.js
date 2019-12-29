var mysql = require("mysql");

// SQL database connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "sqlserver",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as Id " + connection.threadId);
    connection.end();
});