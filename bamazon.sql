DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id int NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    dept_name VARCHAR (100) NOT NULL,
    price INTEGER (10),
    stock_qty INTEGER (10),
    PRIMARY KEY (item_id)
);
-- electronics --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('airpods', 'electronics', 150, 100);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('pixel 4xl', 'electronics', 1000, 4);

-- shoes --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('air max', 'shoes', 130, 10);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('nike lebron', 'shoes', 150, 1);

-- appliances --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('keurig k-mini', 'appliances', 95, 45);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('ninja bl480 blender', 'appliances', 50, 85);

-- clothing --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('wool sweater', 'clothing', 20, 200);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('fleece sweatshirt', 'clothing', 15, 150);

-- books -- 
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('eloquent javascript', 'books', 27, 1);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('the millionaire next door', 'books', 11, 10);

