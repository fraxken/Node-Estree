"use strict";

// Require Third-party Dependencies
const astring = require("astring");
const acorn = require("acorn");

// Require Internal
const { Expression, Block, Debugger } = require("./ESTree/Statements");
const VariableDeclaration = require("./ESTree/VariableDeclaration");
const VariableDeclarator = require("./ESTree/VariableDeclarator");
const Identifier = require("./ESTree/Identifier");
const Literal = require("./ESTree/Literal");

// const body = [];
// body.push(Debugger());
// body.push(Block([
//     new VariableDeclaration("const")
//         .declare(new VariableDeclarator(new Identifier("a"), new Literal("hello world!"))).toJSON()
// ]));

// const toGenerate = {
//     type: "Program",
//     body,
//     sourceType: "script"
// };
// console.log(JSON.stringify(toGenerate, null, 4));

// const code = astring.generate(toGenerate);
// console.log(code);

const code = `
const add = (a, b) => {
    return a + b;
}`;
const ast = acorn.parse(code);
console.log(JSON.stringify(ast, null, 4));

const finalCode = astring.generate(ast);
console.log(finalCode);

