// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { pickOne } from "./utils";

test("Program", () => {
    const sourceType = pickOne("script", "module");
    const nodeBody = pickOne([], [ESTree.Literal(1)]);
    const node = ESTree.Program(sourceType, nodeBody);

    expect(node.type).toStrictEqual("Program");
    expect(node.sourceType).toStrictEqual(sourceType);
    expect(node.body).toStrictEqual(nodeBody);
    expect(Object.keys(node).sort()).toEqual(["type", "sourceType", "body"].sort());
});

test("Identifier", () => {
    const node = ESTree.Identifier("foo");

    expect(node.type).toStrictEqual("Identifier");
    expect(node.name).toStrictEqual("foo");
    expect(node.loc).toStrictEqual(null);
});

test('ImportExpression', () => {
    const source = "./foo";
    const node = ESTree.ImportExpression(ESTree.Literal(source));

    expect(node.type).toStrictEqual("ImportExpression");
    expect(node.source).toStrictEqual(ESTree.Literal(source));
    expect(node.loc).toStrictEqual(null);
})
test('BigIntLiteral', () => {
    const bigint = '9007199254740991';
    const node = ESTree.BigIntLiteral(bigint, bigint);

    expect(node.type).toStrictEqual('Literal');
    expect(node.value).toStrictEqual(bigint);
    expect(node.bigint).toStrictEqual(bigint);
    expect(node.loc).toStrictEqual(null);
});

test('AwaitExpression', () => {
    const expression = ESTree.CallExpression(ESTree.Identifier('foo'));
    const node = ESTree.AwaitExpression(expression);

    expect(node.type).toStrictEqual('AwaitExpression');
    expect(node.argument).toStrictEqual(expression);
    expect(node.loc).toStrictEqual(null);
})

