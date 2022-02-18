import {each} from "../array-utils/index";
import {Nulled} from "../base-utils/index";

export function keys<T>(object: Nulled<T>): (keyof T)[] {
    return object ? Object.keys(object) as (keyof T)[] : [];
}

/**
 * Determines whether the object has the specified property.
 * @name hasOwnProperty
 * @param {object} obj
 * @param {string|number} prop property to test
 * @returns {boolean}
 * @example
 *  hasOwnProperty({foo: 'bar'}, 'foo') // => true
 *  hasOwnProperty({foo: 'bar'}, 'bar') // => false
 */
export function hasOwnProperty<T>(obj: T, prop: string | number): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;

    each(keys, (key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });

    // for (const key in obj) {
    // 	if ((<string[]>keys).indexOf(key) !== -1) {
    // 		result[key as any as K] = obj[key];
    // 	}
    // }

    return result;
}
