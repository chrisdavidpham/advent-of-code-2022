export {}

declare global {
    interface Array<T> {
        unique(comparator: (a: any, b: any) => boolean): T[];
    }
}