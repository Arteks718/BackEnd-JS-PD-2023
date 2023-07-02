import fs from "fs";
import path from "path";
import util from "util";

const readAsync = util.promisify(fs.readFileSync);

const contentDir = fs.readdirSync(".");
console.log(contentDir);
const arr:string[] = [];
// contentDir
//   .filter((file) => file.endsWith(".js"))
//   .forEach((file) => {
//     console.log(file)
//     console.log(fs.readFileSync(file, {encoding: "utf-8"})) 
//     console.log('---------------------------------')
//     readAsync(file, { encoding: "utf8" })
//     .then((data: any) => console.log(data))
//     .catch((err: any) => console.log(err))
//   }
//   );

contentDir
.filter(file => file.endsWith('.js'))
.forEach(file =>
  fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
    if (err) { console.error(err); return; }
    console.log(data);
  })
);
// readAsync(file, { encoding: "utf8" })
// .then((data: any) => arr.push(data))
// .catch((err: any) => console.log(err))