"use strict";

// CONSTANT
const kBinaryOperators = new Set([
    "==", "!=", "===", "!==", "<", "<=", ">", ">=", "<<", ">>",
    ">>>", "+", "-", "*", "/", "%", "|", "^", "&", "in", "instanceof"
]);

function BinaryExpression(operator, left, right) {
    if (!kBinaryOperators.has(operator)) {
        throw new TypeError("operator must be a valid binary operator");
    }

    return { type: "BinaryExpression", operator, left, right };
}

module.exports = {
    BinaryExpression
};
