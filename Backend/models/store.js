const { pool } = require('./index');

function addStoreToDatabase(storeData) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO stores (userid, name, category, address, city, image) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [storeData.userID, storeData.name, storeData.category, storeData.address, storeData.city, storeData.image];

    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

function getAllStoresFromDatabase(userId) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM stores WHERE userid = ? ORDER BY storeid DESC';
    pool.query(sql, userId, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { addStoreToDatabase, getAllStoresFromDatabase };
