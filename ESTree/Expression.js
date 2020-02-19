"use strict";

// Require Internal Dependencies
const Unary = require("./Expr/Unary");
const Binary = require("./Expr/Binary");
const Property = require("./Property");
const isExpression = require("./Utils/isExpression");
const FunctionDeclaration = require("./FunctionDeclaration");

// CONSTANTS
const kAssignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", ",=", "^=", "&=", "**="]);
const kLogicalOperators = new Set(["&&", "||"]);

function ThisExpression() {
    return { type: "ThisExpression" };
}

function ArrayExpression(expr = null) {
    if (expr !== null && !isExpression(expr)) {
        throw new TypeError("expr must be valid Expression AST block");
    }

    return { type: "ArrayExpression", elements: [expr] };
}

function ObjectExpression(property) {
    if (!(property instanceof Property)) {
        throw new TypeError("property must be an instanceof Property");
    }

    return { type: "ObjectExpression", properties: [property] };
}

function FunctionExpression() {
    return { type: "FunctionExpression" };
}

function MemberExpression(object, property, computed = false) {
    return { type: "MemberExpression", object, property, computed };
}

function CallExpression(callee, args = []) {
    const proceedArg = args.map((arg) => (Reflect.has(arg, "toJSON") ? arg.toJSON() : arg));

    return { type: "CallExpression", callee, arguments: proceedArg };
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

function ArrowFunctionExpression(body, expression = true) {
    return new FunctionDeclaration(void 0, void 0, body, { expression }).toJSON();
}

function YieldExpression(arg = null, delegate = false) {
    return { type: "YieldExpression", argument: arg, delegate };
}

module.exports = {
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
    Unary,
    Binary
};
