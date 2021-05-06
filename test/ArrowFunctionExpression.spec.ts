// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

test("ArrowFunctionExpression::object::base", () => {
  const node = ESTree.ArrowFunctionExpression(ESTree.FunctionBody([]));

  expect(node.type).toStrictEqual("ArrowFunctionExpression");
  expect(node.async).toBe(false);
  expect(node.generator).toBe(false);
  expect(node.params).toEqual([]);
  expect(node.expression).toBe(false);
  expect(node.body).toEqual({ type: 'BlockStatement', body: [], loc: null });
  expect(node.id).toBe(null);
  expect(node.loc).toBe(null);
});

test("ArrowFunctionExpression::generate::base", () => {
  const node = ESTree.ArrowFunctionExpression(ESTree.FunctionBody([]));
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(() => {});\n");
})

test("ArrowFunctionExpression::object::with-params", () => {
  const params =  [ESTree.Identifier("ast")];
  const node = ESTree.ArrowFunctionExpression(
    ESTree.FunctionBody([]),
    { params }
  );

  expect(node.type).toStrictEqual("ArrowFunctionExpression");
  expect(node.async).toBe(false);
  expect(node.generator).toBe(false);
  expect(node.params).toEqual(params);
  expect(node.expression).toBe(false);
  expect(node.body).toEqual({ type: 'BlockStatement', body: [], loc: null });
  expect(node.id).toBe(null);
  expect(node.loc).toBe(null);
});

test("ArrowFunctionExpression::generate::with-params", () => {
  const params =  [ESTree.Identifier("ast")];
  const node = ESTree.ArrowFunctionExpression(
    ESTree.FunctionBody([]),
    { params }
  );
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(ast => {});\n");
})