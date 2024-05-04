const soldStock = require("../controller/soldStock");
const { pool } = require("../models/index");

// Add Sales
const addSales = (req, res) => {
  const {
    userID,
    productID,
    productName,
    storeID,
    storeName,
    stockSold,
    saleDate,
    totalSaleAmount,
  } = req.body;
  const query = `INSERT INTO sales (userid, productid, productname, storeid, storename, stocksold, saledate, totalsaleamount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.query(
    query,
    [
      userID,
      productID,
      productName,
      storeID,
      storeName,
      stockSold,
      saleDate,
      totalSaleAmount,
    ],
    (error, results) => {
      if (error) {
        console.error("Error adding sales to MySQL:", error);
        res.status(500).send("Failed to add sale.");
        return;
      }

      soldStock(productID, stockSold);
      res.status(200).send("Sale added successfully");
    }
  );
};

// Get All Sales Data
const getSalesData = (req, res) => {
  const userID = req.params.userID;
  const query = `SELECT * FROM sales WHERE userid = ? ORDER BY saledate DESC`;
  pool.query(query, [userID], (error, results) => {
    if (error) {
      console.error("Error retrieving sales data from MySQL:", error);
      res.status(500).send("Failed to retrieve sales data.");
      return;
    }

    res.json(results);
  });
};

// Get total sales amount
const getTotalSalesAmount = (req, res) => {
  const userID = req.params.userID;
  const query = `SELECT SUM(totalsaleamount) AS totalsaleamount FROM sales WHERE userid = ?`;
  pool.query(query, [userID], (error, results) => {
    if (error) {
      console.error("Error retrieving total sales amount from MySQL:", error);
      res.status(500).send("Failed to retrieve total sales amount.");
      return;
    }

    const totalSaleAmount = results[0].totalSaleAmount || 0;
    res.json({ totalSaleAmount });
  });
};

// Get monthly sales
const getMonthlySales = (req, res) => {
  const query = `SELECT MONTH(saledate) AS month, SUM(totalsaleamount) AS totalsaleamount FROM sales GROUP BY MONTH(saledate)`;
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving monthly sales from MySQL:", error);
      res.status(500).send("Failed to retrieve monthly sales.");
      return;
    }

    res.status(200).json({ monthlySales: results });
  });
};

module.exports = {
  addSales,
  getSalesData,
  getTotalSalesAmount,
  getMonthlySales,
};
