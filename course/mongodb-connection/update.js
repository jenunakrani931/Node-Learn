const dbConnect = require("./mongodb");

const updateData = async () => {
  let db = await dbConnect();
  const result = await db.updateOne(
    {name:'hii'},   
    {$set:{name:'html',category:'language'}}
  )
  console.log("result" ,result);
};

updateData();
