const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

function startHtmlServer(html) {
  http
    .createServer((_, response) => {
      response.writeHeader(200, {
        "Content-Type": "text/html",
        "Content-Security-Policy": "script-src *",
        "Access-Control-Allow-Origin": "*",
        "Referrer-Policy": "unsafe-url",
      });
      response.write(html);
      response.end();
    })
    .listen(PORT, () => {
      console.log(`App running on: ${PORT}`);
    });
}

function main() {
  const htmlPath = path.join(process.cwd(), "html", "index.html");

  fs.readFile(htmlPath, (err, html) => {
    if (err) throw err;

    startHtmlServer(html);
  });
}

main();
