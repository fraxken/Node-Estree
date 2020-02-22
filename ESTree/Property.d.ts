/// <reference path="../global.d.ts" />

declare namespace Property {
    export type Kind = "init" | "get" | "set";
    export type Key = Identifier.JSON | Literal.JSON;

    export interface Options {
        kind?: Kind;
        method?: boolean;
        shorthand?: boolean;
        computed?: boolean;
    }

    export interface JSON {
        type: "Property";
        key: Key;
        value: NodeESTree.Expr<any>;
        kind: Kind;
        method?: boolean;
        shorthand?: boolean;
        computed?: boolean;
    }
}

declare class Property {
    constructor(key: Identifier | Literal, value: NodeESTree.Expr<any>, options?: any);

    key: Property.Key;
    value: NodeESTree.Expr<any>;
    method: boolean;
    shorthand: boolean;
    computed: boolean;

    toJSON(): Property.JSON;
}

export = Property;
export as namespace Property;
