"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.unique = function (comparator) {
    var test = this.filter((a, i, arr) => arr.findIndex(b => comparator(a, b)) == i);
    return test;
};
