import {getLogger} from "logger";

export function parseJson<T>(json: string): T | null {
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        getLogger().error(error);
        return null;
    }
}
