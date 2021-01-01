# Helpers API

## AutoChain(...arr: AutoChainItem[]): Expression< Variant >
Combine multiple level of MemberExpression and CallExpression Node easily.

```js
AutoChain("a", "b", ["c"], "d", ["e"]); // a.b.c().d.e()
```

```ts
type AutoChainItem = string | [string | Expression<Variant> | Super, ExpressionSpreadArray?, boolean?]
```

When autochain iterate on a Array it convert it to a CallExpression Node.
```ts
[string | Expression<Variant> | Super, ExpressionSpreadArray?, boolean?]
```

- The first argument is callee.
- The second argument is the body.
- The third argument is to set the optional property (ES2020 ChainElement).

Second and third argument are optional

## AutoChainStr(chainStr: string, inject: Record< string, ExpressionSpreadArray > = {})

Do the same job as AutoChain but can do it with a string.

```js
AutoChainStr("a.b.?hello().c.d()", {
    hello: [ESTree.Literal(true)]
})
```

It will produce the following code:

```js
a.b.hello(true).c.d();
```

The inject record allow to define CallExpression body (by using the Identifier value as key). If nothing is found then the body is set to an empty array.

## Comment(value: string, options: CommentOptions = {}): Comment
Meriyah based helper. Must be implemented in astring.

```ts
type CommentType = "SingleLine" | "MultiLine" | "HTMLOpen" | "HTMLClose" | "HashbangComment";
interface Comment {
    type: CommentType;
    value: string;
    start?: number;
    end?: number;
    loc?: SourceLocation | null;
}
```

## Symbol(name: string): ESTree.CallExpression
Define an ECMAScript6 Symbol.

## PlainObject(obj: Record< string | number, Expression< Variant > | LiteralValue >): ESTree.ObjectExpression
Create a plainObject where properties are only Literal (and operation kind only init).

```js
PlainObject({
    yoo: "foo", test: Symbol("bar"), lol: true
});
```

It will produce the following code
```js
{
    yoo: "foo",
    test: Symbol("bar"),
    lol: true
}
```

## LiteralArray(...values: LiteralValue[]): ESTree.ArrayExpression

Create an Array where elements are only Literal

```js
LiteralArray(1, 2, true, "boo"); // [1, 2, true, "boo"];
```

## FastCall(members: AutoChainItem[], predicate?: FastCallPredicate)

```js
FastCall(["ee", "ready"], ESTree.AwaitExpression)()
```

it will produce the following code:

```js
await ee.ready();
```

## Template(...args: (Expression< Variant > | string)[]): ESTree.TemplateLiteral

Help to create complicated TemplateLiteral / TemplateElement composition.

```js
Template("hello ", ESTree.Identifier("name")); // `hello ${name}`
```