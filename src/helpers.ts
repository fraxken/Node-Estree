// Import Internal Dependencies
import {
    Identifier, Literal, Property, SourceLocation,
    ObjectExpression, MemberExpression, CallExpression, ExpressionStatement, Expression, Variant,
    TemplateElement, TemplateLiteral, LiteralValue,
    ExpressionSpreadArray,
    Super,
    ArrayExpression
} from "./estree/index";
import { isLiteral } from "./utils";

export type AutoChainItem = string | [string | Expression<Variant> | Super, ExpressionSpreadArray?, boolean?];

function CallExprFromChainItem(arr: [string | Expression<Variant> | Super, ExpressionSpreadArray?, boolean?]) {
    const [callee, args = [], optional = false] = arr;

    return CallExpression(typeof callee === "string" ? Identifier(callee) : callee, args, optional);
}

/**
 * Combine multiple MemberExpression and CallExpression
 * 
 * @example
 * AutoChain("a", "b", ["c"], "d", ["e"]); // a.b.c().d.e()
 */
export function AutoChain(...arr: AutoChainItem[]): Expression<Variant> {
    if (arr.length === 0) {
        throw new Error("Unable to create a MemberExpression list with no items to proceed!");
    }

    const last = arr.pop() as AutoChainItem;
    const property = Array.isArray(last) ? CallExprFromChainItem(last) : Identifier(last);

    switch(arr.length) {
        case 0: return property;
        case 1: {
            return MemberExpression(
                Array.isArray(arr[0]) ? CallExprFromChainItem(arr[0]) : Identifier(arr[0]),
                property
            );
        }
        default: return MemberExpression(AutoChain(...arr), property);
    }
}

export function AutoChainStr(chainStr: string, inject: Record<string, ExpressionSpreadArray> = {}) {
    const groups = chainStr.split(".");
    const items = groups.map((itemStr) => {
        const result = /^([\?]?)([\w]+)([\(]?)/g.exec(itemStr);
        if (result === null) {
            throw new Error("invalid chain item!");
        }
        const [, optional, itemName, isCallExpression] = result;

        return isCallExpression === "(" ? [Identifier(itemName), inject[itemName], optional === "?"] : itemName;
    }) as AutoChainItem[];

    return AutoChain(...items);
}

/**
 * A comment as described by the npm lib meriyah.
 */
export declare type CommentType = "SingleLine" | "MultiLine" | "HTMLOpen" | "HTMLClose" | "HashbangComment";
export interface Comment {
    type: CommentType;
    value: string;
    start?: number;
    end?: number;
    loc?: SourceLocation | null;
}
export type CommentOptions = Partial<Pick<Comment, "type" | "start" | "end" | "loc">>;

export function Comment(value: string, options: CommentOptions = Object.create(null)): Comment {
    const { type = "SingleLine", start, end, loc } = options;

    return { type, value, start, end, loc };
}

/**
 * ES6 Symbol
 * 
 * @example
 * Symbol("foo"); // Symbol("foo")
 */
export function Symbol(name: string) {
    return CallExpression(Identifier("Symbol"), [Literal(name)]);
}

/**
 * Create a plainObject where properties are only Literal (and operation kind only init).
 */
export function PlainObject(obj: Record<string | number, Expression<Variant> | LiteralValue>) {
    const properties: Property[] = [];
    for (const [key, rawValue] of Object.entries(obj)) {
        const value = (isLiteral(rawValue) ? Literal(rawValue as LiteralValue) : rawValue) as Expression<Variant>;
        const property = Property(Identifier(key), value, {
            kind: "init",
            computed: false,
            shorthand: false,
            method: false
        });
        properties.push(property);
    }

    return ObjectExpression(properties);
}

/**
 * Create an Array where elements are only Literal
 */
export function LiteralArray(...values: LiteralValue[]) {
    return ArrayExpression(values.map((value) => Literal(value)));
}

export type FastCallPredicate = (callExpr: CallExpression) => Expression<Variant>;

export function FastCall(members: AutoChainItem[], predicate?: FastCallPredicate) {
    const intermediateCallExpression = (callee: Super | Expression<Variant>, args?: ExpressionSpreadArray) => 
        (typeof predicate === "undefined" ? CallExpression(callee, args) : predicate(CallExpression(callee, args)));

    return (...args: any[]) => ExpressionStatement(intermediateCallExpression(
        // @ts-ignore
        ...(members.length > 0 ? [MemberExpressionList(...members), ...args] : args)
    ));
}

/**
 * Easily create ES6 Template
 * 
 * @example
 * Template("hello", ESTree.Identifier("name")); // `hello ${name}`
 */
export function Template(...args: (Expression<Variant> | string)[]) {
    const quasis: TemplateElement[] = [];
    const exprs: Expression<Variant>[] = [];
    let lastKind: "quasis" | "expr" | null = null;

    for (const node of args) {
        if (typeof node === "string") {
            quasis.push(TemplateElement(node, node, false));
            lastKind = "quasis";
        }
        else {
            exprs.push(node);
            lastKind = "expr";
        }
    }
    if (lastKind === "quasis") {
        quasis[quasis.length - 1].tail = true;
    }
    else {
        quasis.push(TemplateElement("", "", false));
    }

    return TemplateLiteral(quasis, exprs);
}
