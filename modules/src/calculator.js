const sum = function (a, b) {
    return a + b;
};
const sub = function (a, b) {
    return a - b;
};
const div = function (a, b) {
    return a / b;
};
const mult = function (a, b) {
    return a * b;
};
const calc = {
    sum: function (a, b) { return a + b; },
    sub: function (a, b) { return a - b; },
    mult: function (a, b) { return a * b; }
};
export default { sum, sub, div, mult, calc };
