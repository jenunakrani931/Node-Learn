const http = require("http");
const data = require("./data");
const fs = require("fs");
http
  .createServer((res, resp) => {
    resp.writeHead(200, { "content-Type": "application/json" });
    resp.write(JSON.stringify(data));
    resp.end();
  })
  .listen(4000);


