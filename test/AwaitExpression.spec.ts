// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

test('AwaitExpression', () => {
  const expression = ESTree.CallExpression(ESTree.Identifier('foo'));
  const node = ESTree.AwaitExpression(expression);

  expect(node.type).toStrictEqual('AwaitExpression');
  expect(node.argument).toStrictEqual(expression);
  expect(node.loc).toStrictEqual(null);
})

test('AwaitExpression', () => {
  const expression = ESTree.CallExpression(ESTree.Identifier('foo'));
  const program = createLineProgram(ESTree.AwaitExpression(expression));

  expect(astring.generate(program)).toStrictEqual("await foo();\n");
});
