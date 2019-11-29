"use strict";

// CONSTANTS
const kUnaryOperators = new Set(["-", "+", "!", "~", "typeof", "void", "delete"]);
const kUnaryUpdateOperators = new Set(["++", "--"]);

function UnaryExpression(operator, prefix = false, expr) {
    if (!kUnaryOperators.has(operator)) {
        throw new TypeError("operator is not a valid Unary operator");
    }
    if (typeof prefix !== "boolean") {
        throw new TypeError("prefix must be typeof boolean");
    }

    return {
        type: "UnaryExpression",
        operator,
        prefix,
        argument: expr
    };
}

function UpdateExpression(operator, prefix = false, expr) {
    if (!kUnaryUpdateOperators.has(operator)) {
        throw new TypeError("operator is not a valid Unary operator");
    }
    if (typeof prefix !== "boolean") {
        throw new TypeError("prefix must be typeof boolean");
    }

    return {
        type: "UpdateExpression",
        operator,
        prefix,
        argument: expr
    };
}

module.exports = {
    UnaryExpression,
    UpdateExpression
};
