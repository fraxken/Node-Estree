"use strict";

// Require Third-party Dependencies
const astring = require("astring");
const acorn = require("acorn");

// Require Internal
const { Expression, Block, Debugger } = require("./ESTree/Statements");
const { CallExpression, AutomaticMemberExpression } = require("./ESTree/Expression");
const VariableDeclaration = require("./ESTree/VariableDeclaration");
const VariableDeclarator = require("./ESTree/VariableDeclarator");
const Identifier = require("./ESTree/Identifier");
const Literal = require("./ESTree/Literal");
const Program = require("./ESTree/Program");

const ConsoleLog = AutomaticMemberExpression("console", "log");
const log = (message) => CallExpression(ConsoleLog, [new Literal(message).toJSON()]);

const AST = new Program();
AST.add(Debugger());
AST.add(Expression(log("hello world!")));
AST.add(VariableDeclaration.createOne("const", "a", "foo").toJSON());

console.log(JSON.stringify(AST.body, null, 4));
console.log(astring.generate(AST.toJSON()));

// const code = `console.log("hello world")`;
// const ast = acorn.parse(code);
// console.log(JSON.stringify(ast, null, 4));

// const finalCode = astring.generate(ast);
// console.log(finalCode);

