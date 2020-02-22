/// <reference path="../global.d.ts" />

declare namespace FunctionDeclaration {
    export interface ConstructorOptions {
        expression?: boolean;
        generator?: boolean;
        async?: boolean;
    }

    export interface JSON extends ConstructorOptions {
        type: "ArrowFunctionExpression" | "FunctionDeclaration";
        params: any;
        body: any;
    }
}

declare class FunctionDeclaration {
    constructor(name: string | null, params?: any[], body?: any[], options?: FunctionDeclaration.ConstructorOptions);
    toJSON(): FunctionDeclaration.JSON;

    id: Identifier | null;
    params: object[];
    body: any;
    expression: boolean;
    generator: boolean;
    async: boolean;
}

export = FunctionDeclaration;
export as namespace FunctionDeclaration;
