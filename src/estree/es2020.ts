// Import Internal Dependencies
import { Variant, Expression, Literal, LiteralValue, Node } from "./es5";
import { createEstreeNode } from "../utils";

/**
 * bigint property is the string representation of the BigInt value. It doesn't include the suffix n.
 * In environments that don't support BigInt values, value property will be null as the BigInt value can't be represented natively.
 */
export interface BigIntLiteral extends Literal {
    bigint: string;
}

export function BigIntLiteral(value: LiteralValue, bigint: string): BigIntLiteral {
    return createEstreeNode("Literal", { value, bigint });
}

/**
 * ImportExpression node represents Dynamic Imports such as import(source).
 * The source property is the importing source as similar to ImportDeclaration node, but it can be an arbitrary expression node.
 */
export interface ImportExpression extends Expression<"ImportExpression"> {
    source: Expression;
};

export function ImportExpression(source: Expression): ImportExpression {
    return createEstreeNode("ImportExpression", { source });
}

/**
 * ChainExpression
 * 
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export interface ChainElement<T extends Variant = Variant> extends Node<T> {
    optional: boolean;
}

export interface ChainExpression extends Expression<"ChainExpression"> {
    expression: ChainElement;
}
