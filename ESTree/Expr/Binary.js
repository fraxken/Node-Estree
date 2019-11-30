"use strict";

// Require Internal Dependencies
const isExpression = require("../Utils/isExpression");

// CONSTANT
const kBinaryOperators = new Set([
    "==", "!=", "===", "!==", "<", "<=", ">", ">=", "<<", ">>",
    ">>>", "+", "-", "*", "/", "%", "|", "^", "&", "in", "instanceof"
]);

function BinaryExpression(operator, left, right) {
    if (!kBinaryOperators.has(operator)) {
        throw new TypeError("operator must be a valid binary operator");
    }
    if (!isExpression(left)) {
        throw new TypeError("left must be valid AST Expression");
    }
    if (!isExpression(right)) {
        throw new TypeError("right must be valid AST Expression");
    }

    return { type: "BinaryExpression", operator, left, right };
}

module.exports = {
    BinaryExpression
};
