const {pool} = require("./index")

function addProductToDatabase(productData) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO products (userid, name, manufacturer, stock, description) VALUES (?, ?, ?, ?, ?)';
    const values = [productData.userID, productData.name, productData.manufacturer, productData.stock, productData.description];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function getAllProductsFromDatabase(userId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE userid = ?';
    pool.query(sql, userId, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function deleteProductFromDatabase(productId) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    pool.query(sql, productId, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function updateProductInDatabase(productData) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE products SET name = ?, manufacturer = ?, description = ? WHERE id = ?';
    const values = [productData.name, productData.manufacturer, productData.description, productData.productID];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function searchProductsInDatabase(searchTerm) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    const searchValue = `%${searchTerm}%`;

    pool.query(sql, searchValue, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports= {addProductToDatabase,getAllProductsFromDatabase, updateProductInDatabase, searchProductsInDatabase}