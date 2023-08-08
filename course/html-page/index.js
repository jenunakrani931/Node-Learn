const express = require("express");
const path = require("path");
const app = express();

const getPath = path.join(__dirname, "public");

// app.get("", (req, res) => {
//   res.sendFile(`${getPath}/index.html`);
// });

// app.get("/about", (req, res) => {
//   res.sendFile(`${getPath}/about.html`);
// });

// app.get("/*", (req, res) => {
//   res.sendFile(`${getPath}/404.html`);
// });
// app.use(express.static(getPath)); //middleware

// ----- ejs 
app.set("view engine", "ejs");

app.get("/profile", (_, res) => {
  const user = {
    name: "abc",
    email: "abc@abc.com",
    city: "surat",
    skills: ["java", "php", "c", "c++", "html"],
  };
  res.render("profile", { user });
});

app.get("/login", (_, res) => {
  res.render("login");
});
app.listen(2000);
