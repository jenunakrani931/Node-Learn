const express = require("express");
const app = express();

// app.get("", (req, res) => {
//   console.log(req.query.name);
//   res.send("home page" + req.query.name); // http://localhost:4000/?name=abc
// });

// app.get("/about", (req, res) => {
//   res.send("about page");
// });

// app.get("/history", (req, res) => {
//   res.send("history page");
// });

//================= Render html and json
app.get("", (req, res) => {
  res.send(`<h1>home page,</h1><a href="/about">Click to go about page</a>`);
});

// http://localhost:4000/about?name=abc
app.get("/about", (req, res) => {
  res.send(`
  <input type="text" placeholder="About page" value="${
    req.query.name ? req.query.name : ""
  }"/>
  <button>Cick</button>
  <a href="/">Click to go home page</a>
  `);
});

app.get("/history", (req, res) => {
  res.send("history page");
});
app.listen(4000);
