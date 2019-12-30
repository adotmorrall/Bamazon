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
VALUES ('Airpods', 'Electronics', 150, 100);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Pixel 4xl', 'Electronics', 1000, 4);

-- shoes --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Air Max', 'Shoes', 130, 10);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Nike Lebron', 'Shoes', 150, 1);

-- appliances --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Keurig K-mini', 'Appliances', 95, 45);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Ninja BL480 Blender', 'Appliances', 50, 85);

-- clothing --
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Wool sweater', 'Clothing', 20, 200);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Fleece sweatshirt', 'Clothing', 15, 150);

-- books -- 
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Eloquent Javascript', 'Books', 27, 1);
INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ('Millionaire Next Door', 'Books', 11, 10);

