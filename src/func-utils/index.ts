
export function noop() {}

type Fn<R> = () => R;

export function calls(...funcs: Array<() => void>): Fn<void> {
    return () => funcs.forEach((fn) => fn());
};