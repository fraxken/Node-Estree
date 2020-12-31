"use strict";

const { ESTree, Helpers } = require("./dist/index");
const kleur = require("kleur");
const astring = require("astring");

const log = (message) => ESTree.CallExpression(Helpers.MemberExpressionList("console", "log"), [ESTree.Literal(message)]);
const body = [];
// body.push(Helpers.Comment("un comment ici!"));
body.push(ESTree.ExpressionStatement(log("hello world")));
body.push(Helpers.PlainObject({
    yoo: "foo",
    test: 1,
    lol: true
}));

const prog = ESTree.Program("module", body);
console.log(kleur.yellow().bold(JSON.stringify(prog, null, 2)));
console.log("\n");

console.log(kleur.white().bold(astring.generate(prog)));
