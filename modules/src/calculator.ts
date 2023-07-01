const sum = function(a: number, b: number): number {
  return a + b
}

const sub = function(a: number, b: number): number {
  return a - b
}

const div = function(a: number, b: number): number {
  return a / b
}

const mult = function(a: number, b: number): number {
  return a * b
}

interface ICalc {
  sum: (a:number, b:number) => number,
  sub: (a:number, b:number) => number,
  mult: (a:number, b:number) => number
}
const calc: ICalc = {
  sum: function(a, b) { return a + b},
  sub: function(a, b) { return a - b},
  mult: function(a, b) { return a * b}
}

export default {sum, sub, div, mult, calc}