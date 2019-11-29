"use strict";

// Require Internal Dependencies
const Literal = require("./Literal");
const Identifier = require("./Identifier");

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

function Debugger() {
    return { type: "DebuggerStatement" };
}

function Return(arg = null) {
    return { type: "ReturnStatement", arguments: arg };
}

function Labelel(label, body) {
    if (!(label instanceof Identifier)) {
        throw new TypeError("label must be an instanceof Identifier");
    }
    // TODO: check if body is a valid statement

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

function Try(body = [], handler = null, finalizer = null) {
    return { type: "TryStatement", block: Block(body), handler, finalizer };
}

function Throw(expr) {
    return { type: "ThrowStatement", argument: expr };
}

function Catch(param, body) {
    return { type: "CatchClause", param, body: Block(body) };
}

module.exports = {
    Expression,
    Directive,
    Block,
    Empty,
    Debugger,
    Flow: Object.freeze({ Return, Labelel, Break, Continue }),
    Choice: Object.freeze({ If }),
    Exceptions: Object.freeze({ Try, Throw, Catch }),
    Loops: Object.freeze({})
};
