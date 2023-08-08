const express = require("express");
const reqFilter = require("./middleware");
const app = express();
const route = express.Router();
// app.use(reqFilter); //application middleware

route.use(reqFilter)
app.get("/", (req, res) => {
  res.send("home page");
});

route.get("/user", (req, res) => {
  res.send("user page");
});

app.get("/admin", (req, res) => {
  res.send("admin page");
});

app.use("/", route);
app.listen(5000);
