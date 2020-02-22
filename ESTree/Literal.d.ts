/// <reference path="../global.d.ts" />

declare namespace Literal {
    export type JSType = string | number | boolean | symbol | RegExp;

    export interface JSON {
        type: "Literal";
        value: LiteralValue;
    }
}

declare class Literal {
    static isLiteralValue(value: any): boolean;
    static stringToLiteral(value: any): Literal.JSON;
    constructor(value: Literal.JSType);

    value: Literal.JSType;
    toJSON(): Literal.JSON;
}

export = Literal;
export as namespace Literal;
