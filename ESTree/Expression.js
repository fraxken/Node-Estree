"use strict";

// Require Internal Dependencies
const Unary = require("./Expr/Unary");
const Binary = require("./Expr/Binary");
const Identifier = require("./Identifier");
const Property = require("./Property");
const isExpression = require("./Utils/isExpression");

// CONSTANTS
const kAssignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", ",=", "^=", "&="]);
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

function AutomaticMemberExpression(...arr) {
    if (arr.length === 0) {
        throw new Error("unable to process an empty array!");
    }
    const last = arr.pop();
    const property = Array.isArray(last) ?
        CallExpression(typeof last[0] === "string" ? new Identifier(last[0]).toJSON() : last[0], last[1] || []) :
        new Identifier(last).toJSON();

    if (arr.length === 0) {
        return property;
    }
    else if (arr.length === 1) {
        const object = Array.isArray(arr[0]) ?
            CallExpression(typeof arr[0][0] === "string" ? new Identifier(arr[0][0]).toJSON() : arr[0][0], arr[0][1] || []) :
            new Identifier(arr[0]).toJSON();

        return {
            type: "MemberExpression",
            object,
            computed: false,
            property
        };
    }

    return {
        type: "MemberExpression",
        object: buildMemberExpr(...arr),
        computed: false,
        property
    };
}

module.exports = {
    ThisExpression,
    ArrayExpression,
    ObjectExpression,
    FunctionExpression,
    AutomaticMemberExpression,
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
