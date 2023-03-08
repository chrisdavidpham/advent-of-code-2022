export {}

Array.prototype.unique = function<T>(this: T[], comparator: (a: T, b: T) => boolean): T[] {
    return this.filter((a, i, arr) => arr.findIndex(b => comparator(a,b)) == i);
}