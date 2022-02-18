type Func<A, B> = (a: A) => B;

export type FuncAny<A = any, B = any> = (a: A) => B;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

type Fn<R> = () => R;

export function calls(...funcs: Array<() => void>): Fn<void> {
    return () => funcs.forEach((fn) => fn());
}

type ArgType<F> = F extends (arg: infer A) => any ? A : never;

type LastIndexOf<T extends any[]> =
    ((...x: T) => void) extends ((y: any, ...z: infer U) => void)
    ? U['length'] : never;

export function compose<
    F extends Func<any, any>[]
>(...fns: F) {
    return <I extends number>(p: ArgType<F[0]>): ReturnType<F[LastIndexOf<F>]> => {
        const as =  fns.reduce((acc: any, cur) => cur(acc), p);
        return as;
    };
}
