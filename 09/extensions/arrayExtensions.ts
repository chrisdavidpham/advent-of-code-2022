export {}

Array.prototype.unique = function<T>(this: T[], comparator: (a: T, b: T) => boolean): T[] {
    var test = this.filter((a, i, arr) => arr.findIndex(b => comparator(a,b)) == i);
    return test;
}