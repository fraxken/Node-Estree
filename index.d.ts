declare namespace NodeESTree {
    export interface Expr<T> {
        type: T;
    }

    export interface RawProperty extends Expr<"Property"> {
        key: any;
        value: Expr<any>;
        kind: string;
        method: boolean;
        shorthand?: boolean;
        computed?: boolean;
    }

    export class Literal {

    }

    export class Identifier {

    }

    export class Property {
        constructor(key: Identifier | Literal, value, options);
        toJSON(): RawProperty;
    }

    export namespace Expression {
        export interface ArrayExpression<T> extends Expr<"ArrayExpression"> {
            elements: Expr<T>[];
        }
        export interface ObjectExpression extends Expr<"ObjectExpression"> {
            properties: (Property | RawProperty)[];
        }
        export interface MemberExpression extends Expr<"MemberExpression"> {
            object: any;
            property: (Property | RawProperty);
            computed: boolean;
        }

        export function ThisExpression(): Expr<"ThisExpression">;
        export function ArrayExpression<T>(...elements: Expr<T>[]): ArrayExpression<T>;
        export function ObjectExpression(...properties: (Property | RawProperty)[]): ObjectExpression;
        export function FunctionExpression(): Expr<"FunctionExpression">;
        export function MemberExpression(): MemberExpression;
    }
}

export = NodeESTree;
export as namespace NodeESTree;
