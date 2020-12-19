"use strict";

// Require Internal Dependencies
const { UnaryExpression, UpdateExpression } = require("./Expr/Unary");
const { BinaryExpression } = require("./Expr/Binary");
const FunctionDeclaration = require("./FunctionDeclaration");
const { toJSON } = require("./Utils");

// CONSTANTS
const kAssignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", ",=", "^=", "&=", "**="]);
const kLogicalOperators = new Set(["&&", "||"]);

function ExpressionStatement(expression) {
    return { type: "ExpressionStatement", expression };
}

function ThisExpression() {
    return { type: "ThisExpression" };
}

function ArrayExpression(...elements) {
    return { type: "ArrayExpression", elements };
}

function ObjectExpression(properties) {
    return { type: "ObjectExpression", properties };
}

function FunctionExpression(params, body, async = false) {
    const func = new FunctionDeclaration(void 0, params, body, {
        expression: false,
        async
    }).toJSON();
    func.type = "FunctionExpression";

    return func;
}

function MemberExpression(object, property, computed = false) {
    return { type: "MemberExpression", object, property, computed };
}

function CallExpression(callee, args = []) {
    return { type: "CallExpression", callee, arguments: toJSON(args) };
}

function NewExpression(callee, args = []) {
    return { type: "NewExpression", callee, arguments: toJSON(args) };
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

function ArrowFunctionExpression(body, expression = true, async = false) {
    return new FunctionDeclaration(void 0, void 0, body, { expression, async }).toJSON();
}

function YieldExpression(arg = null, delegate = false) {
    return { type: "YieldExpression", argument: arg, delegate };
}

function AwaitExpression(arg) {
    return { type: "AwaitExpression", argument: arg };
}

module.exports = {
    ExpressionStatement,
    ThisExpression,
    ArrayExpression,
    ObjectExpression,
    FunctionExpression,
    MemberExpression,
    CallExpression,
    AssignmentExpression,
    NewExpression,
    ConditionalExpression,
    LogicalExpression,
    SequenceExpression,
    ArrowFunctionExpression,
    YieldExpression,
    AwaitExpression,
    UnaryExpression,
    UpdateExpression,
    BinaryExpression
};
