
export const isObject = <T>(obj: T) => !!obj && typeof obj === 'object';

export const isPlainObject = <T extends Object>(obj: T) => isObject(obj) && obj.constructor === Object;

export const isArray = <T>(array: T) => isObject(array) && Array.isArray(array);

export function isFunction<T>(fn: T): boolean {
    return fn && typeof fn === 'function';
}

export function isEmpty<T>(entity: T): boolean {
    if (Array.isArray(entity)) {
        return entity.length === 0;
    } else if (typeof entity === 'object') {
        for (var prop in entity) {
            if ((entity as Object).hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    } else {
        return !entity;
    }
}

export function isNotEmpty<T>(entity: T): boolean {
    return !isEmpty(entity);
}




export function pipe<A>(...funcs: Array<(arg: A) => A>): (arg: A) => A {
    return funcs.reduce((prevFn, nextFn) => (value: A) => nextFn(prevFn(value)));
};


export const toString = <T extends {toString(): string}>(data: T | null | undefined) => data && data.toString();