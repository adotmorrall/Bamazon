var mysql = require("mysql");
var inquirer = require('inquirer');

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
    // connection.end();
    queryProducts();
});

function queryProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].dept_name + " | " + res[i].price + " | " + res[i].stock_qty);
        }
        console.log("-----------------------------------");
        //We want to execute our function
        userItem();
    });
}

function userItem() {
    inquirer.prompt([
        {
            type: 'input',
            message: `Please type in the ID of the number you'd like to purchase`,
            name: 'item'
        },
        {
            type: 'input',
            message: 'How many items would you like to buy?',
            name: 'quantity'
        }

    ]).then(function (userData) {
        if (userData) {
            console.log(userData.item);
            console.log(userData.quantity);
        }
    });
}