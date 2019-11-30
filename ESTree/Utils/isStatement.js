"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

// CONSTANTS
const kAvailableStatement = new Set([
    "ExpressionStatement",
    "BlockStatement",
    "EmptyStatement",
    "DebuggerStatement",
    "WithStatement",
    "ReturnStatement",
    "LabeledStatement",
    "BreakStatement",
    "ContinueStatement",
    "IfStatement",
    "SwitchStatement",
    "ThrowStatement",
    "TryStatement",
    "WhileStatement",
    "DoWhileStatement",
    "ForStatement",
    "ForInStatement"
]);

function isStatement(obj) {
    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return kAvailableStatement.has(obj.type);
}

module.exports = isStatement;
