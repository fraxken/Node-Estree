"use strict";

// Require Internal Dependencies
const isExpression = require("../Utils/isExpression");

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
    if (!isExpression(expr)) {
        throw new TypeError("expr must be valid AST Expression");
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
    if (!isExpression(expr)) {
        throw new TypeError("expr must be valid AST Expression");
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
