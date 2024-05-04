const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    database: 'assetmanagement'
  });

function initializeMySQL() {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
          if (error) {
            console.error('Error connecting to MySQL:', error);
            reject(error);
          } else {
            console.log('Connected to MySQL database');
            connection.release(); // Release the connection back to the pool
            resolve();
          }
        });
      });
}

module.exports = { pool , initializeMySQL };