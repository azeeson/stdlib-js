import {isArray, isObject} from "base-utils";
import {keys} from "object-utils";

export function size<T>(value: T): number | null {
    if (isArray(value)) {
        return value.length;
    } else if (isObject(value)) {
        return keys(value).length;
    }
    return null;
}
