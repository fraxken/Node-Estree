"use strict";

// Require Internal Dependencies
const Literal = require("./Literal");
const Identifier = require("./Identifier");
const { isExpression, isStatement } = require("./Utils");
const Switch = require("./SwitchStatement");

function Expression(expression) {
    return { type: "ExpressionStatement", expression };
}

function Directive(expr, directive) {
    if (!(expr instanceof Literal)) {
        throw new TypeError("expr must be an instanceof Literal");
    }
    if (typeof directive !== "string") {
        throw new TypeError("directive must be a string");
    }

    return Object.assign(Expression(expr), { directive });
}

function Block(body = []) {
    return { type: "BlockStatement", body };
}

function Empty() {
    return { type: "EmptyStatement" };
}

function WithStatement(object, body) {
    if (!isExpression(object)) {
        throw new TypeError("object must be a valid AST Expression");
    }
    if (!isStatement(body)) {
        throw new TypeError("body must be a valid AST Statement");
    }

    return { type: "WithStatement", object, body };
}

function Debugger() {
    return { type: "DebuggerStatement" };
}

function Return(arg = null) {
    if (!isExpression(arg)) {
        throw new TypeError("arg must be a valid AST Expression");
    }

    return { type: "ReturnStatement", arguments: arg };
}

function Labelel(label, body) {
    if (!(label instanceof Identifier)) {
        throw new TypeError("label must be an instanceof Identifier");
    }
    if (!isExpression(body)) {
        throw new TypeError("body must be a valid AST Expression");
    }

    return { type: "LabeledStatement", label, body };
}

function Break(label = null) {
    if (label !== null && !(label instanceof Identifier)) {
        throw new TypeError("label must be an instanceof Identifier");
    }

    return { type: "BreakStatement", label };
}

function Continue(label = null) {
    if (label !== null && !(label instanceof Identifier)) {
        throw new TypeError("label must be an instanceof Identifier");
    }

    return { type: "ContinueStatement", label };
}

function If(test, consequent, alternate = null) {
    return {
        type: "IfStatement",
        test,
        consequent,
        alternate
    };
}

function WhileStatement(test, body) {
    return { type: "WhileStatement", test, body };
}

// eslint-disable-next-line max-params
function ForStatement(init, test = null, update = null, body) {
    return { type: "ForStatement", init, test, update, body };
}

function ForInStatement(left, right, body) {
    return { type: "ForInStatement", left, right, body };
}

function ForOfStatement(left, right, body) {
    return { type: "ForOfStatement", left, right, body, await: false };
}

function ForAwaitOfStatement(left, right, body) {
    return { type: "ForOfStatement", left, right, body, await: true };
}

function Try(body = [], handler = null, finalizer = null) {
    return { type: "TryStatement", block: Block(body), handler, finalizer };
}

function Throw(expr) {
    return { type: "ThrowStatement", argument: expr };
}

function Catch(param = null, body) {
    return { type: "CatchClause", param, body: Block(body) };
}

module.exports = {
    Expression,
    Directive,
    Block,
    Empty,
    Debugger,
    WithStatement,
    Flow: Object.freeze({ Return, Labelel, Break, Continue }),
    Choice: Object.freeze({ If, Switch }),
    Exceptions: Object.freeze({ Try, Throw, Catch }),
    Loops: Object.freeze({
        WhileStatement, ForStatement, ForInStatement, ForOfStatement, ForAwaitOfStatement
    })
};
