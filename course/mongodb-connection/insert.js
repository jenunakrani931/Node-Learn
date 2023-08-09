const dbConnect = require("./mongodb");

const inserts = async () => {
  let data = await dbConnect();
  let result = await data.insertMany([
    {
      name: "book1",
      brand: "vivo",
      price: 400,
      category: "book",
    },
    { name: "book2", brand: "micromax", price: 520, category: "book" },
  ]);
  console.log(result);
};

inserts();
