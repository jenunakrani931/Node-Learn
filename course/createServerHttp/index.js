const http = require("http");

http
  .createServer((req, res) => {
    res.write("hey i am server");
    res.end();
  })
  .listen(4000);
