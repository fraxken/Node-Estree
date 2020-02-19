"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");
const Identifier = require("../Identifier");
const Literal = require("../Literal");

// CONSTANTS
const kAvailableExpression = new Set([
    "Literal",
    "Identifier",
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
    if (obj instanceof Identifier || obj instanceof Literal) {
        return true;
    }
    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return kAvailableExpression.has(obj.type);
}

module.exports = isExpression;
