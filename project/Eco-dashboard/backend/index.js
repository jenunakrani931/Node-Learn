const express = require("express");
const User = require("./db/User");
const cors = require("cors");
const Product = require("./db/Product");
require("./db/config");

const Jwt = require("jsonwebtoken");
const JwtKey = "e-dashboard";

const app = express();
app.use(cors());
app.use(express.json());

const varifyToken = (req, resp, next) => {
  let token = req.headers["authorization"];
  
  const abc = token.split(" ");
  const xyz = abc[1];

  if (token) {
    Jwt.verify(xyz, JwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token in header" });
  }
};

app.post("/register", async (req, res) => {
  const data = new User(req.body);
  let result = await data.save();

  result = result.toObject();
  delete result.password;

  res.send({ token: token });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2d" }, (err, token) => {
        res.send({ user, token: token });
      });
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

app.get("/products", varifyToken, async (req, res) => {
  let result = await Product.find();
  if (result.length > 0) {
    res.send(result);
  } else {
    res.send({ result: "No Product Found" });
  }
});

app.delete("/product/:_id", varifyToken, async (req, res) => {
  const result = await Product.deleteOne(req.params);
  res.send(result);
});

app.put("/productUpdate/:_id", varifyToken, async (req, res) => {
  await Product.updateOne(req.params, { $set: req.body });
  res.send({
    message: "Product updated successfully",
    updated_data: req.body,
  });
});

app.get("/productById/:id", async (req, res) => {
  const result = await Product.findById({ _id: req?.params?.id });
  console.log("result...",result);
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found..!" });
  }
});

app.get("/product-search/:key", varifyToken, async (req, resp) => {
  let data = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(data);
});

app.listen(4000);
