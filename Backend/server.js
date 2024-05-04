const express = require("express");
const { initializeMySQL, pool } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const Product = require("./models/product");
const app = express();
const PORT = 4000;
initializeMySQL();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error("Error querying MySQL:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        userAuthCheck=user;
        res.send(user);
      } else {
        res.status(401).send("Invalid Credentials");
        userAuthCheck=null;
      }
    });
  });
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl
  };

  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error connecting to MySQL:', err);
          res.status(500).send("Internal Server Error");
          return;
      }

      const query = `INSERT INTO users SET ?`;
      connection.query(query, userData, (error, results) => {
          connection.release(); // Release the connection back to the pool

          if (error) {
              console.error('Error querying MySQL:', error);
              res.status(500).send("Internal Server Error");
              return;
          }

          res.status(200).send("Signup Successful");
      });
  });
});

app.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: "6429979b2e5434138eda1564" });
  res.json(result);
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
