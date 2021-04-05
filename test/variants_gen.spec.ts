// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram, log } from "./utils";

test("Identifier", () => {
    const program = createLineProgram(ESTree.Identifier("foo"));
    expect(astring.generate(program)).toStrictEqual("foo;\n");
});

test('ImportExpression', () => {
    const program = createLineProgram(ESTree.ImportExpression(ESTree.Literal("./foo")));
    expect(astring.generate(program)).toStrictEqual("import(\"./foo\");\n");
})

test('BigIntLiteral', () => {
    const bigint = 9007199254740991;

    const program = createLineProgram(ESTree.BigIntLiteral(bigint, bigint.toString()));
    expect(astring.generate(program)).toStrictEqual(bigint.toString() +'n;\n')
});

test('AwaitExpression', () => {
    const expression = ESTree.CallExpression(ESTree.Identifier('foo'));
    const program = createLineProgram(ESTree.AwaitExpression(expression));

    expect(astring.generate(program)).toStrictEqual("await foo();\n");
});

test('ForOfStatement', () => {
    const left = ESTree.VariableDeclaration([ESTree.VariableDeclarator(ESTree.Identifier('item'))]);
    const right = ESTree.Identifier('items');
    const body = ESTree.BlockStatement([ESTree.ExpressionStatement(log("hello world!"))]);
    const program = createLineProgram(ESTree.ForOfStatement(left, right, body));

    expect(astring.generate(program)).toEqual("for (var item of items) {\n  console.log(\"hello world!\");\n};\n");
});

