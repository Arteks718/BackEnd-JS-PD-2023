import { filesJS } from './filesystem.js';
// console.log(_.sum([3,4,1,2]));
// console.log(sum(3, 5));
// console.log(sub(5, 4));
import fs from 'fs';
const data = fs.readFileSync('./readme.md', {
    encoding: 'utf8'
});
console.log(data);
console.log(filesJS);
