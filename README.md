# Node.js ESTree
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/Node-Estree/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fraxken/Node-Estree/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/bundlephobia/min/node-estree)
![dep](https://img.shields.io/david/fraxken/Node-Estree)

Complete and compliant [ESTree](https://github.com/estree/estree) spec implementation in TypeScript (for Node.js and the Browser). This project includes types definitions, variant functions and some helpers aside to help generating code.

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install node-estree
# or
$ yarn add node-estree
```

## Usage example

Following example require the [astring](https://github.com/davidbonnet/astring#readmes) package to generate a JavaScript code with the EStree compliant AST.

```js
"use strict";
const { ESTree, Helpers, VarDeclaration, Switch } = require("node-estree");
const astring = require("astring");

const logNative = (body) => ESTree.CallExpression(Helpers.AutoChain("console", "log"), body);
const log = (message) => logNative([ESTree.Literal(message)]);

// Note: i use a generator function because I find it easier to read
function* program() {
    yield ESTree.ExpressionStatement(log("hello world!"));
    {
        const objExpr = Helpers.PlainObject({
            yoo: "foo", test: Helpers.Symbol("bar"), lol: true
        });

        yield ESTree.BlockStatement([
            VarDeclaration.let("myObject", objExpr),
            ESTree.ExpressionStatement(logNative([ESTree.Identifier("myObject")]))
        ]);
    }

    yield ESTree.ExpressionStatement(Helpers.AutoChainStr("a.b.?hello().c.d()", {
        hello: [ESTree.Literal(true)]
    }));

    yield VarDeclaration.const("myArray", Helpers.LiteralArray(1, 2, true, "boo"));

    yield new VarDeclaration({ kind: "var" })
        .declare("a", ESTree.Literal(1))
        .declareEx("b", 2)
        .toJSON();

    yield new Switch(ESTree.Identifier("a"), { autoBreak: true })
        .case(1, [log("foo")])
        .case(2, [log("bar")])
        .toJSON();
}

const prog = ESTree.Program("module", [...program()]);
console.log("\n");
console.log(astring.generate(prog));
```

The astring lib will generate the following JavaScript code:
```js
console.log("hello world!");
{
  let myObject = {
    yoo: "foo",
    test: Symbol("bar"),
    lol: true
  };
  console.log(myObject);
}
a.b.hello(true).c.d();
const myArray = [1, 2, true, "boo"];
var a = 1, b = 2;
switch (a) {
  case 1:
    console.log("foo")
    break;
  case 2:
    console.log("bar")
    break;
}
```

When you want to generate a given code I recommend you to use [astexplorer](https://astexplorer.net/). You can observe how the tree is built and reproduce the same thing with my lib.

## API

### ESTree
The ESTree object exports all members for all versions of ECMAScript (the current implementation doesn't work by version.. everything to ES2020 has been implemented). Variant names are exactly the same as the Specification. Everything has been done to be as close to the specification as possible.

Technical notes:
- MethodDefinition use the property **isStatic** instead of **static** (because static is a reserved keyword).
- Some Variant with to much properties (like FunctionDeclarations etc) use an options payload.

```js
FunctionDeclaration(Identifier("functionName"), { body:[], params: [], async: true, generator: false, });
```

--- 

Available Variant
```ts
type Variant =
    "Program" |
    "Identifier" |
    "Literal" |
    "RegExpLiteral" |
    "ExpressionStatement" |
    "BlockStatement" |
    "EmptyStatement" |
    "DebuggerStatement" |
    "WithStatement" |
    "ReturnStatement" |
    "LabeledStatement" |
    "BreakStatement" |
    "ContinueStatement" |
    "IfStatement" |
    "SwitchStatement" |
    "SwitchCase" |
    "ThrowStatement" |
    "TryStatement" |
    "CatchClause" |
    "WhileStatement" |
    "DoWhileStatement" |
    "ForStatement" |
    "ForInStatement" |
    "FunctionDeclaration" |
    "VariableDeclaration" |
    "VariableDeclarator" |
    "ThisExpression" |
    "ArrayExpression" |
    "ObjectExpression" |
    "Property" |
    "FunctionExpression" |
    "UnaryExpression" |
    "UpdateExpression" |
    "BinaryExpression" |
    "AssignmentExpression" |
    "LogicalExpression" |
    "MemberExpression" |
    "ConditionalExpression" |
    "CallExpression" |
    "NewExpression" |
    "SequenceExpression" |
    "ForOfStatement" |
    "Super" |
    "SpreadElement" |
    "ArrowFunctionExpression" |
    "YieldExpression" |
    "TemplateLiteral" |
    "TaggedTemplateExpression" |
    "TemplateElement" |
    "ObjectPattern" |
    "ArrayPattern" |
    "RestElement" |
    "AssignmentPattern" |
    "ClassBody" |
    "MethodDefinition" |
    "ClassDeclaration" |
    "ClassExpression" |
    "MetaProperty" |
    "ImportDeclaration" |
    "ImportExpression" |
    "ImportSpecifier" |
    "ImportDefaultSpecifier" |
    "ImportNamespaceSpecifier" |
    "ExportNamedDeclaration" |
    "ExportSpecifier" |
    "ExportDefaultDeclaration" |
    "ExportAllDeclaration" |
    "AwaitExpression" |
    "ChainExpression" |
    "BigIntLiteral";
```

### Others

Those implementation are experimental and may change in future (they are not related to the ESTree spec in any way). Please also feel free to feedback or PR new things!

- [Helpers API](./docs/Helpers.md)
- [VarDeclaration](./docs/VarDeclaration.md)
- [Switch (stand for SwitchStatement)](./docs/Switch.md)

## License
MIT
