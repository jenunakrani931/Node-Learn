const express = require("express");
const EventEmitter = require("events");
const app = express();
const event = new EventEmitter();

let count = 0;

event.on("countApi", () => {
  count++;
  console.log("event call", count);
}); 

app.get("/", (req, res) => {
  res.send("Api call");
  event.emit("countApi");
});

app.get("/search", (req, res) => {
  res.send("search Api call");
  event.emit("CountApi");
});

app.get("/update", (req, res) => {
  res.send("update Api call");
  event.emit("CountApi");
});
app.listen(4000);
