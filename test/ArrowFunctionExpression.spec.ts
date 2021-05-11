// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

/**
 * 
 * BASIC
 * 
 */

function getBaseNode() {
  return ESTree.ArrowFunctionExpression(ESTree.FunctionBody([]));
}

test("ArrowFunctionExpression::object::", () => {
  const node = getBaseNode();

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
  const node = getBaseNode();
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(() => {});\n");
})

/**
 * 
 * WITH PARAMETERS
 * 
 */

function getNodeWIthParams() {
  const params =  [ESTree.Identifier("user")];
  const node = ESTree.ArrowFunctionExpression(
    ESTree.FunctionBody([]),
    { params }
  );

  return { node, params };
}

test("ArrowFunctionExpression::object::with-params", () => {
  const { node, params } = getNodeWIthParams();

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
  const { node } = getNodeWIthParams();
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(user => {});\n");
});

/**
 * 
 * WITH ASYNC
 * 
 */

function getNodeWithAsync() {
  const params =  [ESTree.Identifier("user")];
  const node = ESTree.ArrowFunctionExpression(
    ESTree.FunctionBody([]),
    { params, async: true }
  );

  return { node, params };
}

test('ArrowFunctionExpression::object::async', () => {
  const { node, params } = getNodeWithAsync();

  expect(node.type).toStrictEqual("ArrowFunctionExpression");
  expect(node.async).toBe(true);
  expect(node.generator).toBe(false);
  expect(node.params).toEqual(params);
  expect(node.expression).toBe(false);
  expect(node.body).toEqual({ type: 'BlockStatement', body: [], loc: null });
  expect(node.id).toBe(null);
  expect(node.loc).toBe(null);
});

test("ArrowFunctionExpression::generate::async", () => {
  const { node } = getNodeWithAsync();
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(async user => {});\n");
});

/**
 * 
 * WITH BODY
 * 
 */

function getNodeWithBody() {
  const identifier =  ESTree.Identifier("user");
  const returnStatement = ESTree.ReturnStatement(identifier);
  const node = ESTree.ArrowFunctionExpression(
    ESTree.FunctionBody([returnStatement]),
    { params: [identifier], async: true }
  );

  return { node, returnStatement, identifier };
}

test('ArrowFunctionExpression::object::body', () => {
  const { node, identifier, returnStatement } = getNodeWithBody();

  expect(node.type).toStrictEqual("ArrowFunctionExpression");
  expect(node.async).toBe(true);
  expect(node.generator).toBe(false);
  expect(node.params).toEqual([identifier]);
  expect(node.expression).toBe(false);
  expect(node.body).toEqual({ type: 'BlockStatement', body: [returnStatement], loc: null });
  expect(node.id).toBe(null);
  expect(node.loc).toBe(null);
});

test("ArrowFunctionExpression::generate::body", () => {
  const { node } = getNodeWithBody();
  const program = createLineProgram(node);
  const generatedProgram = astring.generate(program);

  expect(generatedProgram).toStrictEqual("(async user => {\n  return user;\n});\n");
});