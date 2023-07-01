import fs from 'fs';
import path from 'path';
import util from 'util';

const text1 = fs.readFileSync(path.resolve("./readme.md"), {
  encoding: "utf-8",
});

console.log("Sync file reading");
console.log(text1);

// console.log(path.dirname('./'))
// const text = fs.readFile(path.resolve('readme.md'), {encoding: 'utf8'},
//   (error, data) => {
//     if(error) {console.log('Error file reading')}
//     else {console.log('Data:', data);}
//   })
// console.log(text)

const readAsync = util.promisify(fs.readFileSync);

readAsync("../../readme.md", { encoding: "utf-8" })
  .then((data) => console.log(data))
  .catch((err) => console.log("Error file reading"));

const content = fs.readdirSync('./src');
console.log('current dir content:');
console.log(content);
