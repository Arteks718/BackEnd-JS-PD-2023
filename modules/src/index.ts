import {greeting} from './greeting.js'
import calc from './calculator.js'
import os from 'os';
console.log(greeting('Artyom', 'Kleshchov'))

console.log(calc.sum(5, 3));
console.log(calc.sub(5, 3));
console.log(Math.round(calc.div(5, 3) * 100) / 100);
console.log(calc.mult(5, 3));
console.log(os.userInfo({encoding: 'utf8'}));
console.log(os.platform(), os.release());
console.log(calc.calc.mult(5,3))