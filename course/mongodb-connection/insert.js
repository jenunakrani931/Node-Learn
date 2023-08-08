const dbConnect = require("./mongodb");

module.exports = insert = async () => {
  const db = await dbConnect();
  const result =await db.insert({
    name:'myBook',brand:'vivo',price:400,category:'book'
  })
  console.log(result);
};
