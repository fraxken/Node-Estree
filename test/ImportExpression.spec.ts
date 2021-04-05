// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

test('ImportExpression', () => {
  const source = "./foo";
  const node = ESTree.ImportExpression(ESTree.Literal(source));

  expect(node.type).toStrictEqual("ImportExpression");
  expect(node.source).toStrictEqual(ESTree.Literal(source));
  expect(node.loc).toStrictEqual(null);
})

test('ImportExpression', () => {
  const program = createLineProgram(ESTree.ImportExpression(ESTree.Literal("./foo")));
  expect(astring.generate(program)).toStrictEqual("import(\"./foo\");\n");
})
