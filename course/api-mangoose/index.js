const express = require("express");
const multer = require("multer");
const os = require("os");
require("./config");
const product = require("./product");

const app = express();

app.use(express.json());

//os modules
// console.log(os.arch());
// console.log(os.freemem()/(1024*1024*1024));
// console.log(os.totalmem()/(1024*1024*1024));
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.userInfo());

//create
app.post("/create", async (req, resp) => {
  let data = new product(req.body);
  let result = await data.save();
  resp.send(result);
});

//get http://localhost:4000/list?limit=2&page=2

app.get("/list", async (req, resp) => {
  // let result = await product.find();
  // resp.send(result);

  const { page, limit } = req.query;
  try {
    const docs = await product
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const totaldocs = await product.countDocuments();

    const prevPage = parseInt(page) - 1;
    const nextPage = parseInt(page) + 1;
    resp.json({
      totalPages: Math.ceil(totaldocs / limit),
      currentPage: page,
      totaldocs: totaldocs,
      prevPage: prevPage,
      nextPage: nextPage,
      hasPrevPage: prevPage !== 0 ? true : false,
      hasNextPage: Math.ceil(totaldocs / limit) == page ? false : true,
      limit: limit,
      docs,
    });
  } catch (err) {
    console.error(err.message);
  }
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
const Upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); //'uploads' is file name
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("upload_file");

app.post("/upload", Upload, (req, resp) => {
  resp.send("Upload file successfully");
});
app.listen(4000);
