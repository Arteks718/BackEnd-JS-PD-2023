import http from "http";
import path from "path";
import fs from "fs";
import util from "util";
import url from "url";

const requestListener = (req: any, res: any) => {
  res.writeHead(200, { 'Content-Type': 'text/html'});
  res.write('Hello Client\n');
  const data = url.parse(req.url, true).query;
  console.dir(data)
  res.write(`url: ${req.url}`);
  res.end();
};

export { requestListener };
