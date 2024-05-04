CREATE DATABASE assetmanagement;
USE assetmanagement;
CREATE TABLE users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phonenumber BIGINT,
    imageurl VARCHAR(255)
);
CREATE TABLE stores (
    storeid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES users(userid)
);
CREATE TABLE products (
    productid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    name VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid)
);
CREATE TABLE sales (
    saleid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    productid INT,
    productname VARCHAR(255),
    storeid INT,
    storename VARCHAR(255),
    stocksold INT NOT NULL,
    saledate DATE NOT NULL,
    totalsaleamount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (productid) REFERENCES products(productid),
    FOREIGN KEY (storeid) REFERENCES stores(storeid)
);

CREATE TABLE purchases (
    purchaseid INT AUTO_INCREMENT PRIMARY KEY,
    userid INT,
    productid INT,
    productname VARCHAR(255) NOT NULL, -- New column for product name
    quantitypurchased INT,
    purchasedate DATE,
    totalpurchaseamount DECIMAL(10, 2),
    FOREIGN KEY (productid) REFERENCES products(productid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);
