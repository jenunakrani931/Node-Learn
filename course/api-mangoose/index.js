const express = require("express");
const multer = require('multer')
require("./config");
const product = require("./product");

const app = express();

app.use(express.json());

//create
app.post("/create", async (req, resp) => {
  let data = new product(req.body);
  let result = await data.save();
  resp.send(result);
});

//get
app.get("/list", async (req, resp) => {
  let result = await product.find();
  resp.send(result);
});

//delete
app.delete("/delete/:_id", async (req, resp) => {
  const result = await product.deleteOne(req.params);
  resp.send(result);
});

//upadte
app.put("/update/:_id", async (req, resp) => {
  const result = await product.updateOne(req.params, { $set: req.body });
  resp.send(result);
});

//search
app.get("/search/:key", async (req, resp) => {
  let data = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  resp.send(data);
});

// file upload
app.post("/upload",(req,resp)=>{
    resp.send('upload')
})
app.listen(4000);
