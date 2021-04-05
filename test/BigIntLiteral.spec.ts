// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

test('BigIntLiteral', () => {
  const bigint = 9007199254740991;

  const program = createLineProgram(ESTree.BigIntLiteral(bigint, bigint.toString()));
  expect(astring.generate(program)).toStrictEqual(bigint.toString() +'n;\n')
});

test('BigIntLiteral', () => {
  const bigint = '9007199254740991';
  const node = ESTree.BigIntLiteral(bigint, bigint);

  expect(node.type).toStrictEqual('Literal');
  expect(node.value).toStrictEqual(bigint);
  expect(node.bigint).toStrictEqual(bigint);
  expect(node.loc).toStrictEqual(null);
});
