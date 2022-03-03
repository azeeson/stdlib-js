export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | {[key: string]: JsonValue};

export type JsonObject = {[key: string]: JsonValue};

export type Json = {[key: string]: JsonValue} | JsonValue[];
