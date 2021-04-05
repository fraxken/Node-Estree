// Import Third-party Dependencies
import * as astring from 'astring'

// Import Internals
import { ESTree } from '../src/index'

// Import Utils
import { createLineProgram } from './utils'

test("Identifier", () => {
  const node = ESTree.Identifier("foo");

  expect(node.type).toStrictEqual("Identifier");
  expect(node.name).toStrictEqual("foo");
  expect(node.loc).toStrictEqual(null);
});

test("Identifier", () => {
  const program = createLineProgram(ESTree.Identifier("foo"));
  expect(astring.generate(program)).toStrictEqual("foo;\n");
});