// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

test('Super::object', () => {
  const node = ESTree.Super();

  expect(node.type).toStrictEqual("Super");
  expect(node.loc).toBe(null);
});

test('Super::generate', () => {
  const node = ESTree.Super();
  const program = createLineProgram(node);
  const generatedCode = astring.generate(program)

  expect(generatedCode).toStrictEqual("super;\n");
});

