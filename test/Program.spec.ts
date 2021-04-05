// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { pickOne, log } from "./utils";

test("Program", () => {
  const sourceType = pickOne("script", "module");
  const nodeBody = pickOne([], [ESTree.Literal(1)]);
  const node = ESTree.Program(sourceType, nodeBody);

  expect(node.type).toStrictEqual("Program");
  expect(node.sourceType).toStrictEqual(sourceType);
  expect(node.body).toStrictEqual(nodeBody);
  expect(Object.keys(node).sort()).toEqual(["type", "sourceType", "body"].sort());
});