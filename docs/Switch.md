# Switch

Switch is a helper class to generate SwitchStatement Node.

## Usage example

```js
import { ESTree, Helpers, Switch, VarDeclaration } from "node-estree";

const log = (message) => ESTree.CallExpression(Helpers.AutoChain("console", "log"), [ESTree.Literal(message)]);

VarDeclaration.const("aGlobalVar", Math.random() >= 0.5 ? 1 : 2)

new Switch(ESTree.Identifier("aGlobalVar"), { autoBreak: true })
        .case(1, [log("foo")])
        .case(2, [log("bar")])
        .toJSON();
```

It will produce the following code

```js
const aGlobalVar = 1; // or 2

switch (aGlobalVar) {
  case 1:
    console.log("foo")
    break;
  case 2:
    console.log("bar")
    break;
}
```

## API

### Switch.constructor(discriminant: Expression<Variant>, options: SwitchOptions = {})

Create a new Switch helper, just need to provide the discriminant of the SwitchStatement.

```ts
interface SwitchOptions {
    autoBreak?: boolean;
}
```

The option autoBreak when enabled will automatically add BreakStatement if there is no BreakStatement or ReturnStatement.

### Switch.case(test: Expression<Variant> | LiteralValue, consequent: Statement<Variant>[]): this
Add a new SwitchCase node to current SwitchStatement object cases. This method support LiteralValue as argument.

```ts
type LiteralValue = string | boolean | null | number | RegExp | bigint;
```

### Switch.toJSON(): ESTree.SwitchStatement
Return the current object SwitchStatement Node.