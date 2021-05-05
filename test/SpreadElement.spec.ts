// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

function buildSpreadElementExpression() {
  const expression = ESTree.ExpressionStatement(ESTree.ArrayExpression([
    ESTree.Literal(2),
    ESTree.Literal(3),
  ]));
  const node = ESTree.SpreadElement(expression);

  return { node, expression };
}

test('SpreadElement::object', () => {
  const { node, expression } = buildSpreadElementExpression();

  expect(node.type).toStrictEqual("SpreadElement");
  expect(node.argument).toStrictEqual(expression);
  expect(node.loc).toBe(null);
});

test('SpreadElement::generate', () => {
  const { node } = buildSpreadElementExpression();
  const program = createLineProgram(node);
  const generatedCode = astring.generate(program)
  
  expect(generatedCode).toStrictEqual("...[2, 3];;\n");
});