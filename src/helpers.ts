import {
    Identifier, Literal, Property, SourceLocation,
    ObjectExpression, MemberExpression, CallExpression, ExpressionStatement, Expression, Variant,
    TemplateElement, TemplateLiteral, LiteralValue
} from "./estree/index";

export function MemberExpressionList(...arr: (string | any[])[]) {
    if (arr.length === 0) {
        throw new Error("unable to process an empty array!");
    }

    const last = arr.pop();
    const property = Array.isArray(last) ?
        CallExpression(typeof last[0] === "string" ? Identifier(last[0]) : last[0], last[1] || []) :
        Identifier(last as string);

    switch(arr.length) {
        case 0: return property;
        case 1: {
            const object = Array.isArray(arr[0]) ?
                CallExpression(typeof arr[0][0] === "string" ? Identifier(arr[0][0]) : arr[0][0], arr[0][1] || []) :
                Identifier(arr[0]);

            return MemberExpression(object, property);
        }
        default: return MemberExpression(MemberExpressionList(...arr), property);
    }
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

export function Symbol(name: string) {
    return CallExpression(Identifier("Symbol"), [Literal(name)]);
}

export function PlainObject(obj: Record<string | number, LiteralValue>) {
    const properties: Property[] = [];
    for (const [key, value] of Object.entries(obj)) {
        const property = Property(Identifier(key), Literal(value), {
            kind: "init",
            computed: false,
            shorthand: false,
            method: false
        });
        properties.push(property);
    }

    return ObjectExpression(properties);
}

export function FastCall(predicate = null, members) {
    // @ts-ignore
    const intermediateExpr = (...args) => (predicate === null ? CallExpression(...args) : predicate(CallExpression(...args)));

    return (...args) => ExpressionStatement(intermediateExpr(
        ...(members.length > 0 ? [MemberExpressionList(...members), ...args] : args)
    ));
}

export function FastLiteral(...args: (Expression<Variant> | string)[]) {
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
