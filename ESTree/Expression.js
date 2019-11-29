"use strict";

// Require Internal Dependencies
const Unary = require("./Expr/Unary");
const Binary = require("./Expr/Binary");

// CONSTANTS
const kAssignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", ",=", "^=", "&="]);
const kLogicalOperators = new Set(["&&", "||"]);

function MemberExpression(object, property, computed = false) {
    return { type: "MemberExpression", object, property, computed };
}

function CallExpression(callee, args = []) {
    return { type: "CallExpression", callee, arguments: args };
}

function NewExpression(callee, args = []) {
    return { type: "NewExpression", callee, arguments: args };
}

function ConditionalExpression(test, alternate, consequent) {
    return { type: "ConditionalExpression", test, alternate, consequent };
}

function AssignmentExpression(operator, left, right) {
    if (!kAssignmentOperators.has(operator)) {
        throw new TypeError("operator must be a valid assignment operator");
    }

    return { type: "AssignmentExpression", operator, left, right };
}

function LogicalExpression(operator, left, right) {
    if (!kLogicalOperators.has(operator)) {
        throw new TypeError("operator must be a valid logical operator");
    }

    return { type: "LogicalExpression", operator, left, right };
}

function SequenceExpression(expressions = []) {
    return { type: "SequenceExpression", expressions };
}

module.exports = {
    MemberExpression,
    CallExpression,
    AssignmentExpression,
    NewExpression,
    ConditionalExpression,
    LogicalExpression,
    SequenceExpression,
    Unary,
    Binary
};
