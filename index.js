"use strict";

function ExprStmt(expression) {
    return { type: "ExpressionStatement", expression };
}

function CallExpr(callee, args = []) {
    return { type: "CallExpression", callee, arguments: args };
}

function ExprCall(callee, args) {
    return ExprStmt(CallExpr(callee, args));
}

module.exports = {
    ExprStmt,
    ExprCall,
    CallExpr
};
