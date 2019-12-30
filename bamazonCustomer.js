var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table');

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
    // console.log("Connected as Id " + connection.threadId);
    console.log(' ');
    console.log('Bamazon: Online shopping for electronics, apparel and much more!');
    console.log(' ');
    queryProducts();
});

function queryProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // 3rd party NPM package to make output look nicer
        // Remove Qty once app is complete
        var prodTable = new Table({
            head: ['Id', 'Product', 'Department', 'Price', 'Qty'],
            colWidths: [5, 30, 20, 10, 5]
        });

        // Remove qty once app is complete
        for (var i = 0; i < res.length; i++) {
            prodTable.push(
                [res[i].item_id,
                res[i].product_name,
                res[i].dept_name,
                '$' + res[i].price, res[i].stock_qty]);
        }
        console.log(prodTable.toString());
        console.log(" ");
        // We want to execute our function
        userItem();
    });
}

function userItem() {
    inquirer.prompt([
        {
            type: 'input',
            message: `Please type in the ID of the number you'd like to purchase:`,
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
            connection.query('SELECT * FROM products WHERE item_id=' + userData.item, function (err, res){
                if (err) throw err;
                // 'Error handling' if user types in Id that doesn't exist
                if (res.length === 0) {
                    console.log(' ');
                    console.log(`Sorry, we coudn't find that item. Please make sure that you type in an item ID between 1 - 10.`);
                } else {
                    // Now, I must log user response, update stock qty and give user the price
                    var item = res[0];
                    // If user's quantity request is less than or equal to the amount available, proceed to purchase & give price
                    if (userData.quantity <= item.stock_qty) {
                        var newStockQty = item.stock_qty - userData.quantity;
                        connection.query('UPDATE products SET stock_qty=' + newStockQty + ' WHERE item_id=' + userData.item, function(err, res) {
                            if (err) throw err;
                            console.log(`Purchased item`);
                        }
                    )}  
                }
            })
        }
    });
}