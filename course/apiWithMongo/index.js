const express = require("express");
const mongodb = require("mongodb");
const dbConnect = require("./mongodb");

const app = express();

app.use(express.json());

//Get api
app.get("/", async (req, resp) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  resp.send(data);
  console.log(data);
});

//post api
app.post("/", async (req, resp) => {
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  resp.send(result);
  console.log(result);
});

//update
app.put("/:data", async (req, resp) => {
  let data = await dbConnect();
  let result = await data.updateOne(
    { name: req.params.data },
    { $set: req.body }
  );
  resp.send({ result: "updated" });
  console.log(result);
});

//delete api
app.delete("/:id", async (req, resp) => {
  let data = await dbConnect();
  const result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  resp.send({ result: "deleted " });
  console.log(result);
});

app.listen(4000);
