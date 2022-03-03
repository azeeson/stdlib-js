import {isArray} from "base-utils";
import {Json, JsonValue} from "types/json";

export function decycle(object: Json): Json {
    const objects = new WeakMap<Json, string>();

    return (function inner<T extends JsonValue>(value: T, path: string): T {
        let old_path: string | undefined;

        if ( typeof value === 'object' && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String)) {


            old_path = objects.get(value);

            if (old_path !== undefined) {
                return {$ref: old_path} as any as T;
            }

            objects.set(value, path);

            if (isArray(value)) {

                const result = value.map((element: JsonValue, index: number) => {
                    return inner(element, `${path}[${index}]`);
                });
                return result as T;

            }

            const result: JsonValue = {};
            Object.keys(value).forEach((name) => {
                result[name] = inner(value[name], `${path}[${JSON.stringify(name)}]`);
            });

            return result as T;
        }

        return value;
    }(object, '$'));
}
