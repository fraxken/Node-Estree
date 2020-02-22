declare namespace NodeESTree {
    export interface Expr<T> {
        type: T;
    }

    export interface LRExpr<T, L = Expr<any>, R = Expr<any>> extends Expr<T> {
        left: L;
        right: R;
    }

    export type Identifier = Identifier | Identifier.JSON | string;
    export type Literal = Literal | Literal.JSON | Literal.JSType;

    export interface Comment {
        type: "Line" | "Block";
        value: string;
    }
}

export = NodeESTree;
export as namespace NodeESTree;