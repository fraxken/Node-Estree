// Import Internal Dependencies
import { Expression } from "./es5";
import { createEstreeNode } from "../utils";

/**
 * A new expression.
 */
export interface AwaitExpression extends Expression<"AwaitExpression"> {
    argument: Expression;
};

export function AwaitExpression(argument: Expression): AwaitExpression {
    return createEstreeNode("AwaitExpression", { argument });
}
