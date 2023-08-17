const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const data = new User(req.body);
  let result = await data.save();

  result = result.toObject();
  delete result.password;

  res.send(result);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      res.send(user);
    } else {
      res.send({ result: `Not exist ${req.body.email} email address` });
    }
  } else {
    res.send({ result: `Need to enter email and password both` });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let result = await Product.find();
  if (result.length > 0) {  
    res.send(result);
  } else {
    res.send({ result: "No Product Found" });
  }
});
app.listen(4000);
