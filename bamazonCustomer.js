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
        var prodTable = new Table({
            head: ['Id', 'Product', 'Department', 'Price'],
            colWidths: [5, 30, 20, 10]
        });

        for (var i = 0; i < res.length; i++) {
            prodTable.push(
                [res[i].item_id,
                res[i].product_name,
                res[i].dept_name,
                '$' + res[i].price]);
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
            connection.query('SELECT * FROM products WHERE item_id=' + userData.item, function (err, res) {
                if (err) throw err;
                // 'Error handling' if user types in Id that doesn't exist
                if (res.length === 0) {
                    console.log(' ');
                    console.log(`We couldn't find that item. Please make sure that you type in an Id between 1 - 10.`);
                    console.log(' ');
                    // connection.end();
                    userItem();
                    return;
                }
                var item = res[0];
                // If user's quantity request is less than or equal to the amount available, proceed to purchase & give price
                if (userData.quantity <= item.stock_qty) {
                    var newStockQty = item.stock_qty - userData.quantity;
                    var userTotal = userData.quantity * item.price;
                    connection.query('UPDATE products SET stock_qty=' + newStockQty + ' WHERE item_id=' + userData.item, function (err, res) {
                        if (err) throw err;
                        // console.log(item);
                        console.log(' ');
                        console.log('Order details');
                        console.log('_____________________________________');
                        console.log(' ');
                        console.log('Item: ' + item.product_name);
                        console.log('Quantity: ' + userData.quantity);
                        console.log('Subtotal: $' + item.price);
                        console.log('Order Total: $' + userTotal);
                        console.log(' ');
                        console.log('Thank you for your purchase, please shop again!');
                        connection.end();
                    }
                    )
                } else {
                    // If user's quantity request is greater than the amount available, log message and call the userItem function to pick lesser amount or a diff product
                    console.log(' ');
                    console.log(`There's only ` + item.stock_qty + ' available for the item you selected. Please choose a lower quantity, or select another product if none are left. Thanks!');
                    console.log('');
                    userItem();
                }
            })
        }
    });
}