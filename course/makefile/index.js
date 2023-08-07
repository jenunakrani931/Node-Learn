const fs = require("fs");
const path = require("path");

//--------- Craete Simple file
// fs.writeFileSync("hello.txt", "my name is node js");
// const fs = require("fs").writeFileSync;
// fs("hello.txt", "my name is node dsd");
// console.log(__filename);

//--------- Getting input from command line
// const input = process.argv;
// if (input[2] == "add") {
//   fs.writeFileSync(input[3], input[4]); //npm start add fileName "Content"
// } else if (input[2] == "remove") {
//   fs.unlinkSync(input[3]); // npm start remove fileName
// } else {
//   console.log("invalid input");
// }

//---------- Dispaly file list from folder
// const dirPath = path.join(__dirname, "filesName");

// for (let index = 0; index < 5; index++) {
//   fs.writeFileSync(dirPath + `/file${index}`, `File${index} Created successfully`);
// }

// fs.readdir(dirPath,(error,filesName)=>{
//   console.log(filesName); // into array

//   filesName.forEach((items)=>{
//     console.log(items);
//   })
// })

//--------------Simple crud
const dirPath = path.join(__dirname, "crud");
const filePath = `${dirPath}/file`;
// fs.writeFileSync(filePath ,'crud file created successfully');

// fs.readFile(filePath,'utf8',(err,item)=>{
//   console.log(item);
// })

// fs.appendFile(filePath," Updated file",(err)=>{
//   if (!err) console.log('updated sucessfully');
// })

// fs.rename(filePath, `${dirPath}/renameFile`, (err) => {
//   if (!err) console.log("rename sucessfully");
// });

fs.unlinkSync(`${dirPath}/renameFile`)