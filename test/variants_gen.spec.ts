// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

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
})

