# ASTree
[ESTREE](https://github.com/estree/estree) Spec compliant AST Generator crafted for Node.js. This project is still experimental and doesn't implement the whole estree spec (doing my best).

> Feel free to Pull-request or open issues

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm install astree
```

## Usage example

Following example require the [astring](https://github.com/davidbonnet/astring#readmes) package to generate the JavaScript code with the AST Tree.

```js
"use strict";

const astring = require("astring");
const {
    Expression: { CallExpression, ArrowFunctionExpression, NewExpression },
    Helpers: { CreateMemberExpr },
    Identifier, Literal, Program, VariableDeclaration
} = require("astree");

const log = (message) => CallExpression(CreateMemberExpr("console", "log"), [new Literal(message)]);
const createRequire = (name) => CallExpression(CreateMemberExpr("require"), [new Literal(name)]);
const setImmediate = (body) => CallExpression(CreateMemberExpr("setImmediate"), [ArrowFunctionExpression(body)]);

const AST = new Program();
AST.add(VariableDeclaration.createOne("const", "EventEmitter", createRequire("events")));
AST.add(VariableDeclaration.createOne("const", "ee", NewExpression(new Identifier("EventEmitter"))));
AST.add(setImmediate([
    CallExpression(CreateMemberExpr("ee", "emit"), [new Literal("start")])
]));
{
    const body = [log("hello world!")];
    const args = [new Literal("start"), ArrowFunctionExpression(body)];
    AST.add(CallExpression(CreateMemberExpr("ee", "on"), args));
}

console.log(JSON.stringify(AST.body, null, 4));
console.log(astring.generate(AST.toJSON()));
```

it will produce the following JavaScript code:
```js
const EventEmitter = require("events");
const ee = new EventEmitter();
setImmediate(() => {
  ee.emit("start")
})
ee.on("start", () => {
  console.log("hello world!")
})
```

## API

### Expression
### FunctionDeclaration
### Helpers
### Identifier
### Literal
### Identifier
### Modules
### Program
### Property
### Statements
### SwitchStatement
### Template
### VariableDeclaration
### VariableDeclarator

## Roadmap

- Implement [BigIntLiteral](https://github.com/estree/estree/blob/master/es2020.md#bigintliteral)
- Implement [Template Literals](https://github.com/estree/estree/blob/master/es2015.md#template-literals)
- Implement [Patterns](https://github.com/estree/estree/blob/master/es2015.md#patterns)
- Implement [Classes](https://github.com/estree/estree/blob/master/es2015.md#classes)
- Enhance function (arrow, generator, async etc) declaration and made it simpler.

## License
MIT
