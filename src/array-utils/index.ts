import { isArray } from "../base-utils/index";

/**
 * Checking that the value is not an empty array.
 * @param value 
 * @returns 
 */
export function isArrayNotEmpty<T>(value: T[] | null): boolean {
    return isArray(value) && !!value && value.length > 0;
}

