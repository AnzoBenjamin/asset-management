const Product = require("../models/product");

const purchaseStock = async (productID, purchaseStockData) => {
  try {
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error connecting to MySQL:', err);
              return;
          }

          const query = `SELECT * FROM products WHERE id = ?`;
          connection.query(query, [productID], async (error, results) => {
              if (error) {
                  console.error('Error querying MySQL:', error);
                  return;
              }

              if (results.length > 0) {
                  const product = results[0];
                  let updatedStock = parseInt(product.stock) + purchaseStockData;

                  const updateQuery = `UPDATE products SET stock = ? WHERE id = ?`;
                  connection.query(updateQuery, [updatedStock, productID], (updateError, updateResults) => {
                      connection.release(); // Release the connection back to the pool

                      if (updateError) {
                          console.error('Error updating MySQL:', updateError);
                          return;
                      }

                      console.log("Stock updated successfully:", updateResults);
                  });
              } else {
                  console.error("Product not found");
              }
          });
      });
  } catch (error) {
      console.error("Error updating Purchase stock ", error);
  }
};

module.exports = purchaseStock;