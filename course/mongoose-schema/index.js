const mongoose = require("mongoose");
const url = "mongodb+srv://jncodistree:codistree@learn.clvdlir.mongodb.net/";

mongoose.connect(url);
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
});

const saveInDb = async () => {
  const productModel = mongoose.model("test", productSchema);
  let data = new productModel({
    name: "hey",
    brand: "opq",
    price: "741",
    category: "lpq",
  });
  let result = await data.save();
  console.log(result);
};
// saveInDb();

const updateInDb = async () => {
  const Product = mongoose.model("test", productSchema);
  let data = await Product.updateOne(
    {
      name: "hey",
    },
    { $set: { name: "hello" } }
  );
  console.log(data);
};
// updateInDb()

const deleteInDb =async () => {
    const Product = mongoose.model("test", productSchema);
    let data = await Product.deleteOne(
        {
          name: "hello",
        },
      );
      console.log(data);
};
// deleteInDb()

const findInDb =async () => {
    const Product = mongoose.model("test", productSchema);
    let data = await Product.find();
      console.log(data);
};
findInDb()