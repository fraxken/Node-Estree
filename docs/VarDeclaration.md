# VarDeclaration

VarDeclaration is a helper class to easily generate Variable Declaration (and declarator).

## Usage example

To generate one declaration with only **one** declarator:

```js
import { VarDeclaration, ESTree } from "node-estree";

const Node = ESTree.Literal(null);

// var myVar = null;
VarDeclaration.var("myVar", Node);

// let myLet = null;
VarDeclaration.let("myLet", Node);

// const myLet = null;
VarDeclaration.const("myConst", Node);
```

If there is a need to manage several declarators:

```js
// let a = 1, b = 2;
new VarDeclaration({ kind: "let" }) // <-- kind not required
        .declare("a", ESTree.Literal(1))
        // declareEx allow LiteralValue as argument (value will be automatically converted to a Literal AST)
        .declareEx("b", 2)
        .toJSON();
```

It is necessary to call the toJSON() method to retrieve a plainObject (AST).

## API

### VarDeclaration.kind(id: string | Identifier, init: Expression | null): ESTree.VariableDeclaration
Return an ESTree VariableDeclaration with one VariableDeclarator.

### VarDeclaration.constructor(options?: VarDeclarationOptions)

By default the kind option is equal to `let`. Available type for kind is `"var" | "let" | "const"`.

```ts
interface VarDeclarationOptions {
    kind?: VariableKind;
}
```

### VarDeclaration.declare(id: string | Identifier, init: Expression | null): this
Add a new VariableDeclarator to the current VariableDeclaration object.

### VarDeclaration.declareEx(id: string | Identifier, init: Expression | LiteralValue)
Can take any literal value as argument. Note, however, that this is not possible with the **null** value.

```ts
type LiteralValue = string | boolean | null | number | RegExp | bigint;
```

### VarDeclaration.toJSON(): ESTree.VariableDeclaration
Return the current object VariableDeclaration Node.