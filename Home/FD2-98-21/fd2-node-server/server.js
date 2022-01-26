const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1"; // или localhost
const port = 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  switch (req.url) {
    case "/":
      fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(data);
      });
      // res.end('<h1>hello1</h1>');
      break;
    case "/css/styles.css":
      fs.readFile(path.join(__dirname, "css", "styles.css"), "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, {
          "Content-Type": "text/css"
        });
        res.end(data);
      });
      break;
    case "/users":
      fs.readFile(path.join(__dirname, "data", "users.json"), "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(data);
      });
      break;
    default:
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end(`<h1>404 Error</h1><p>Content not found</p>`);
  }
});

server.listen(port, host, () => {
  console.log(`node.js API Server is running on http://${host}:${port}`);
  // console.log(__dirname);
  // console.log(__filename);
});

