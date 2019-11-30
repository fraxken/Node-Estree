"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

// CONSTANTS
const kAvailableExpression = new Set([
    "ExpressionStatement",
    "ThisExpression",
    "ArrayExpression",
    "ObjectExpression",
    "FunctionExpression",
    "UnaryExpression",
    "UpdateExpression",
    "BinaryExpression",
    "AssignmentExpression",
    "LogicalExpression",
    "MemberExpression",
    "ConditionalExpression",
    "CallExpression",
    "NewExpression",
    "SequenceExpression"
]);

function isExpression(obj) {
    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return kAvailableExpression.has(obj.type);
}

module.exports = isExpression;
