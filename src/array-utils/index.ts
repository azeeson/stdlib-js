import {isArray} from "../base-utils/index";

/**
 * Checking that the value is not an empty array.
 * @param value
 * @returns
 */
export function isArrayNotEmpty<T>(value?: T[] | null): boolean {
    return isArray(value) && value.length > 0;
}

export function each<T>(value: T[], callback: (value: T, key: string) => void): void {
    if (Array.isArray(value)) {
        for (const k in value) {
            callback(value[k], k);
        }
    }
}
