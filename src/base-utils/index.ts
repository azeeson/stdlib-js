import {hasOwnProperty} from "object-utils";
import {FuncAny} from "types";

export const isObject = (obj: unknown): obj is Object => isNotNil(obj) && typeof obj === 'object';

export const isPlainObject = <T extends Object>(obj: T) => isObject(obj) && obj.constructor === Object;

export const isArray = <T>(array: unknown): array is T[] => isObject(array) && Array.isArray(array);

export function isFunction(fn: any): fn is FuncAny {
    return isNotNil(fn) && typeof fn === 'function';
}

export type Nulled<T> = T | null | undefined;


export function isNil<T>(value: Nulled<T>): value is (null | undefined) {
    return value === null || value === undefined;
}

export function isNotNil<T>(value: Nulled<T>): value is T {
    return !isNil(value);
}

export function isEmpty<T>(entity: T): boolean {
    if (isArray(entity)) {
        return entity.length === 0;
    } else if (isObject(entity)) {
        for (const prop in entity) {
            if (hasOwnProperty(entity, prop)) {
                return false;
            }
        }
        return true;
    }
    return !entity;

}

export function isNotEmpty<T>(entity: T): boolean {
    return !isEmpty(entity);
}




export function pipe<A>(...funcs: Array<(arg: A) => A>): (arg: A) => A {
    return funcs.reduce((prevFn, nextFn) => (value: A) => nextFn(prevFn(value)));
}


export const toString = <T extends {toString(): string}>(data: T | null | undefined) => data && data.toString();

export function clone<T>(sourceObj: T): T {
    const cloneObj: T = {} as T;
    for (const key in sourceObj) {
        if (sourceObj[key] instanceof Array) {
            if (sourceObj[key]) {
                // create an empty value first
                const str = `{"${  key  }" : ""}`;
                Object.assign(cloneObj, JSON.parse(str));
                // update with the real value
                cloneObj[key] = sourceObj[key];
            } else {
                Object.assign(cloneObj, []);
            }
        } else if (typeof sourceObj[key] === "object") {
            cloneObj[key] = clone(sourceObj[key]);
        } else {

            if (hasOwnProperty(cloneObj, key)) {
                cloneObj[key] = sourceObj[key];
            } else { // insert the property
                // need create a JSON to use the 'key' as its value
                const str = `{"${  key  }" : "${  sourceObj[key]  }"}`;
                // insert the new field
                Object.assign(cloneObj, JSON.parse(str));
            }
        }
    }
    return cloneObj;
}
