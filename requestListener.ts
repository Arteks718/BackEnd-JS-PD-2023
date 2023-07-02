import http from "http";
import path from "path";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

let k: number = 0;
const requestListener = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const { url, method } = req;
  console.log("client request: ", url, method);
  if (method == "GET") {
    const page: any = url == "/" ? "about.html" : url;
    const regHTMLPage = /^.*\.html$/;
    if (regHTMLPage.test(page)) {
      const __dirname = path.dirname("./pages/");
      const pagePath = path.join(__dirname, "/pages/", page);
      if (fs.existsSync(pagePath)) {
        readFile(pagePath)
          .then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(data);
          })
          .catch((error) => {
            res.statusCode = 500;
            console.log("asdasd");
            res.end("Server data error", error);
          });
      } else {
        readFile(path.join(__dirname, "/pages/", "404.html")).then((data) => {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        });
      }
    }
  }
};

export { requestListener };
