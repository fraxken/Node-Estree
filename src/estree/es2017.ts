// Import Internal Dependencies
import { Expression } from "./es5";
import { createEstreeNode } from "../utils";

/**
 * A new expression.
 */
export interface AwaitExpression extends Expression<"AwaitExpression"> {
    expressions: Expression[];
};

export function AwaitExpression(expressions: Expression[]): AwaitExpression {
    return createEstreeNode("AwaitExpression", { expressions });
}
