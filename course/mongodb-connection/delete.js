const dbConnect = require("./mongodb");

const deleteData = async () => {
  const db = await dbConnect();
  const result = await db.deleteOne({ name: "html" });
  console.log(result);
};
deleteData();
