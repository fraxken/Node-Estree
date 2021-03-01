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

