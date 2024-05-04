const {pool} = require('../models/index');

const addPurchaseToDatabase = (userID, productID, productName, quantityPurchased, purchaseDate, totalPurchaseAmount) => {
  return new Promise((resolve, reject) => {
      const query = `INSERT INTO purchases (userid, productid, productname, quantitypurchased, purchasedate, totalpurchaseamount) VALUES (?, ?, ?, ?, ?, ?)`;
      pool.query(query, [userID, productID, productName, quantityPurchased, purchaseDate, totalPurchaseAmount], (error, results) => {
          if (error) {
              console.error('Error adding purchase to MySQL:', error);
              reject(error);
              return;
          }
          resolve(results);
      });
  });
};

const getPurchaseDataFromDatabase = (userID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM purchases WHERE userid = ? ORDER BY purchasedate DESC`;
        pool.query(query, [userID], (error, results) => {
            if (error) {
                console.error('Error retrieving purchase data from MySQL:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

const getTotalPurchaseAmountFromDatabase = (userID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT SUM(totalpurchaseamount) AS totalpurchaseamount FROM purchases WHERE userid = ?`;
        pool.query(query, [userID], (error, results) => {
            if (error) {
                console.error('Error retrieving total purchase amount from MySQL:', error);
                reject(error);
                return;
            }
            const totalPurchaseAmount = results[0].totalPurchaseAmount || 0;
            resolve(totalPurchaseAmount);
        });
    });
};

module.exports = { addPurchaseToDatabase, getPurchaseDataFromDatabase, getTotalPurchaseAmountFromDatabase };
