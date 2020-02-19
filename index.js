"use strict";

// Require Third-party Dependencies
const astring = require("astring");

// Require Internal
const { Expression, Block, Debugger } = require("./ESTree/Statements");
const { CallExpression, AutomaticMemberExpression, ArrowFunctionExpression } = require("./ESTree/Expression");
const VariableDeclaration = require("./ESTree/VariableDeclaration");
const VariableDeclarator = require("./ESTree/VariableDeclarator");
const Identifier = require("./ESTree/Identifier");
const Literal = require("./ESTree/Literal");
const Program = require("./ESTree/Program");

const ConsoleLog = AutomaticMemberExpression("console", "log");
const Event = AutomaticMemberExpression("foo", "on");
const log = (message) => CallExpression(ConsoleLog, [new Literal(message).toJSON()]);
const requireSample = (depName) => CallExpression(AutomaticMemberExpression("require"), [new Literal(depName).toJSON()]);

const AST = new Program();
AST.add(VariableDeclaration.createOne("const", "http", requireSample("http")));
AST.add(CallExpression(Event, [new Literal("start").toJSON(), ArrowFunctionExpression(Block())]));

console.log(JSON.stringify(AST.body, null, 4));
console.log(astring.generate(AST.toJSON()));

