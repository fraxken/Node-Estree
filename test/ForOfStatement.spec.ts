// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram, log } from "./utils";

const left = ESTree.VariableDeclaration([ESTree.VariableDeclarator(ESTree.Identifier('item'))]);
const right = ESTree.Identifier('items');
const body = ESTree.BlockStatement([ESTree.ExpressionStatement(log("hello world!"))]);
const node = ESTree.ForOfStatement(left, right, body);

test('ForOfStatement', () => {
  expect(node.await).toStrictEqual(false);
  expect(node.left).toStrictEqual(left);
  expect(node.right).toStrictEqual(right);
  expect(node.body).toStrictEqual(body);
  expect(node.loc).toBe(null);
  expect(node.type).toStrictEqual('ForOfStatement');
})


test('ForOfStatement', () => {
  const program = createLineProgram(node);

  expect(astring.generate(program)).toEqual("for (var item of items) {\n  console.log(\"hello world!\");\n};\n");
});
