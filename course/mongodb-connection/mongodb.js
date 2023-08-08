const { MongoClient } = require("mongodb");
const url = "mongodb+srv://jncodistree:codistree@learn.clvdlir.mongodb.net/";
const database = "crud";
const client = new MongoClient(url);

async function dbConnect() {
  let result = await client.connect();
  const db = result.db(database);
  return db.collection("test");
  //   const reponse = await collection.find({}).toArray();
  //   console.log(reponse);
}
module.exports = dbConnect;
    