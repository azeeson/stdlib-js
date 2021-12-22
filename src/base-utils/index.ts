
export const isObject = <T>(obj: T) => !!obj && typeof obj === 'object';

export const isPlainObject = <T extends Object>(obj: T) => isObject(obj) && obj.constructor === Object;

export const isArray = <T>(array: T) => isObject(array) && Array.isArray(array);

export function isFunction<T>(fn: T): boolean {
    return fn && typeof fn === 'function';
}




type Fn<R> = () => R;

export function pipe<A>(...funcs: Array<(arg: A) => A>): (arg: A) => A {
    return funcs.reduce((prevFn, nextFn) => (value: A) => nextFn(prevFn(value)));
};

export function calls(...funcs: Array<() => void>): Fn<void> {
    return () => funcs.forEach((fn) => fn());
};

export const toString = <T extends {toString(): string}>(data: T | null | undefined) => data && data.toString();