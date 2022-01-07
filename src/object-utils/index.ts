import { Nulled } from "base-utils";

export function keys<T>(object: Nulled<T>): (keyof T)[] {
    return object ? Object.keys(object) as (keyof T)[] : [];
}