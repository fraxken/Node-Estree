import * as Identifier from "./ESTree/Identifier"
import * as Literal from "./ESTree/Literal"
import * as Modules from "./ESTree/Modules"

declare namespace NodeESTree {
    export interface Expr<T> {
        type: T;
    }

    export interface LRExpr<T, L = Expr<any>, R = Expr<any>> extends Expr<T> {
        left: L;
        right: R;
    }

    export type IdentifierValue = Identifier | Identifier.JSON | string;
    export type LiteralValue = Literal | Literal.JSON | Literal.JSType;

    export interface Comment {
        type: "Line" | "Block";
        value: string;
    }
}


export = NodeESTree;
export as namespace NodeESTree;