
export type Func<Return, Args extends any[]> = (...args: Args) => Return;

export type FuncAny = Func<any, any[]>;
