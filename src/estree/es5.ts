// Import Internal Dependencies
import { createEstreeNode } from "../utils";
import { Super, SpreadElement, ModuleDeclaration } from "./es2015";
import { ChainElement } from "./es2020";

/**
 * Each subtype of Node is documented below with the specific string of its type field.
 */
export type Variant =
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

export interface Node<T extends Variant = Variant> {
    /**
    The type field is a string representing the AST variant type. 
    */
    type: T;

    /**
    The loc field represents the source location information of the node. If the node contains no information about the source location, the field is null;
    */
    loc: SourceLocation | null;

    /**
    Custom fields implement by some libraries like Meriyah.
    */
    start?: number;
    end?: number;
    range?: [number, number];
}

export interface SourceLocation {
    source?: string | null;

    /**
    The position of the first character of the parsed source region
    */
    start: Position;

    /**
    The position of the first character after the parsed source region
    */
    end: Position;
}

export interface Position {
    /**
    line number (1-indexed)
    */
    line: number;

    /**
    column number (0-indexed)
    */
    column: number;
}

// Destructuring binding and assignment are not part of ES5, but all binding positions accept Pattern to allow for destructuring in ES6.
export interface Pattern<T extends Variant = Variant> extends Node<T> {};

// Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.
export interface Expression<T extends Variant = Variant> extends Node<T> {};

// Any statement.
export interface Statement<T extends Variant = Variant> extends Node<T> {};

// Any declaration node. Note that declarations are considered statements; this is because declarations can appear in any statement context.
export interface Declaration<T extends Variant = Variant> extends Statement<T> {};

/**
 * An identifier. Note that an identifier may be an expression or a destructuring pattern.
 */
export interface Identifier extends Expression<"Identifier">, Pattern<"Identifier"> {
    name: string;
}

export function Identifier(name: string): Identifier {
    return createEstreeNode("Identifier", { name });
}

/**
 * A literal token. Note that a literal can be an expression.
 * @note
 * - bigint added in ES2020
 */
export type LiteralValue = string | boolean | null | number | RegExp | bigint;

export interface Literal<T extends "Literal" | "RegExpLiteral" | "BigIntLiteral" = "Literal"> extends Expression<T> {
    value: LiteralValue;
}

export function Literal(value: LiteralValue): Literal {
    return createEstreeNode("Literal", { value });
}

/**
 * The regex property allows regexes to be represented in environments that don’t support certain flags such as y or u.
 * In environments that don't support these flags value will be null as the regex can't be represented natively.
 */
export interface RegExpLiteral extends Literal<"RegExpLiteral"> {
    regex: {
        pattern: string;
        flags: string;
    }
}

export function RegExpLiteral(pattern: string, flags: string): RegExpLiteral {
    return createEstreeNode("RegExpLiteral", { value: null, regex: { pattern, flags } });
}

/**
 * A complete program source tree.
 * 
 * @note
 * - sourceType for ES2015
 */
export interface Program extends Node<"Program"> {
    sourceType: "script" | "module";

    body: (Directive | Statement | ModuleDeclaration<any>)[];
}

export function Program(sourceType: "script" | "module", body: (Directive | Statement | ModuleDeclaration<any>)[]) {
    return { type: "Program", sourceType, body };
}

/**
 * A function declaration or expression.
 * 
 * @note
 * - added generator property in ES2015
 * - added async property in ES2017
 */
export interface Function<T extends Variant = Variant> extends Node<T> {
    id: Identifier | null;
    params: Pattern[];
    body: FunctionBody;
    generator: boolean;
    async: boolean;
}

/**
 * An expression statement, i.e., a statement consisting of a single expression.
 */
export interface ExpressionStatement extends Statement<"ExpressionStatement"> {
    expression: Expression;
}

export function ExpressionStatement(expression: Expression): ExpressionStatement {
    return createEstreeNode("ExpressionStatement", { expression });
}

/**
 * A directive from the directive prologue of a script or function. The directive property is the raw string source of the directive without quotes.
 */
export interface Directive extends Node<"ExpressionStatement"> {
    expression: Literal;
    directive: string;
}

export function Directive(expression: Literal, directive: string): Directive {
    return createEstreeNode("ExpressionStatement", { expression, directive });
}

/**
 * A block statement, i.e., a sequence of statements surrounded by braces.
 */
export interface BlockStatement extends Statement<"BlockStatement"> {
    body: Statement[];
}

export function BlockStatement(body: Statement[] = []): BlockStatement {
    return createEstreeNode("BlockStatement", { body });
}

/**
 * The body of a function, which is a block statement that may begin with directives.
 */
export interface FunctionBody extends BlockStatement {
    body: (Directive | Statement)[];
}

export function FunctionBody(body: (Directive | Statement)[]): FunctionBody {
    return createEstreeNode("BlockStatement", { body });
}

/**
 * An empty statement, i.e., a solitary semicolon.
 */
export interface EmptyStatement extends Statement<"EmptyStatement"> {};

export function EmptyStatement(): EmptyStatement {
    return createEstreeNode("EmptyStatement");
}

/**
 * A debugger statement.
 */
export interface DebuggerStatement extends Statement<"DebuggerStatement"> {};

export function DebuggerStatement(): DebuggerStatement {
    return createEstreeNode("DebuggerStatement");
}

/**
 * A with statement.
 */
export interface WithStatement extends Statement<"WithStatement"> {
    object: Expression;
    body: Statement;
};

export function WithStatement(object: Expression, body: Statement): WithStatement {
    return createEstreeNode("WithStatement", { object, body });
}

/**
 * A return statement.
 */
export interface ReturnStatement extends Statement<"ReturnStatement"> {
    argument: Expression | null;
};

export function ReturnStatement(argument?: Expression | null): ReturnStatement {
    return createEstreeNode("ReturnStatement", { argument: argument ?? null });
}

/**
 * A labeled statement, i.e., a statement prefixed by a break/continue label.
 */
export interface LabeledStatement extends Statement<"LabeledStatement"> {
    label: Identifier;
    body: Statement;
};

export function LabeledStatement(label: Identifier, body: Statement): LabeledStatement {
    return createEstreeNode("LabeledStatement", { label, body });
}

/**
 * A break statement.
 */
export interface BreakStatement extends Statement<"BreakStatement"> {
    label: Identifier | null;
};

export function BreakStatement(label?: Identifier | null): BreakStatement {
    return createEstreeNode("BreakStatement", { label: label ?? null });
}

/**
 * A continue statement.
 */
export interface ContinueStatement extends Statement<"ContinueStatement"> {
    label: Identifier | null;
};

export function ContinueStatement(label?: Identifier | null): ContinueStatement {
    return createEstreeNode("ContinueStatement", { label: label ?? null });
}

/**
 * An if statement.
 */
export interface IfStatement extends Statement<"IfStatement"> {
    test: Expression;
    consequent: Expression;
    alternate: Statement | null;
};

export function IfStatement(test: Expression, consequent: Expression, alternate?: Identifier | null): IfStatement {
    return createEstreeNode("IfStatement", {
        test,
        consequent,
        alternate: alternate ?? null
    });
}

/**
 * A switch statement.
 */
export interface SwitchStatement extends Statement<"SwitchStatement"> {
    discriminant: Expression;
    cases: SwitchCase[];
};

export function SwitchStatement(discriminant: Expression, cases: SwitchCase[]): SwitchStatement {
    return createEstreeNode("SwitchStatement", { discriminant, cases });
}

/**
 * A case (if test is an Expression) or default (if test === null) clause in the body of a switch statement.
 */
export interface SwitchCase extends Statement<"SwitchCase"> {
    test: Expression | null;
    consequent: Statement[];
};

export function SwitchCase(test: Expression | null, consequent: Statement[]): SwitchCase {
    return createEstreeNode("SwitchCase", { test, consequent });
}

/**
 * A throw statement.
 */
export interface ThrowStatement extends Statement<"ThrowStatement"> {
    argument: Expression;
};

export function ThrowStatement(argument: Expression): ThrowStatement {
    return createEstreeNode("ThrowStatement", { argument });
}

/**
 * A try statement. If handler is null then finalizer must be a BlockStatement.
 */
export interface TryStatement extends Statement<"TryStatement"> {
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
};

export function TryStatement(block: BlockStatement, handler: null, finalizer: BlockStatement): TryStatement;
export function TryStatement(block: BlockStatement, handler: CatchClause, finalizer?: BlockStatement | null): TryStatement;
export function TryStatement(block: BlockStatement, handler: any, finalizer?: any): TryStatement {
    return createEstreeNode("TryStatement", {
        block,
        handler: handler ?? null,
        finalizer: finalizer ?? null
    });
}

/**
 * A catch clause following a try block.
 * @note
 * - param "Pattern | null" since ES2019
 */
export interface CatchClause extends Statement<"CatchClause"> {
    param: Pattern | null;
    body: BlockStatement;
};

export function CatchClause(param: Pattern | null, body: BlockStatement): CatchClause {
    return createEstreeNode("CatchClause", { param, body });
}

/**
 * A while statement.
 */
export interface WhileStatement extends Statement<"WhileStatement"> {
    test: Expression;
    body: Statement;
};

export function WhileStatement(test: Expression, body: Statement): WhileStatement {
    return createEstreeNode("WhileStatement", { test, body });
}

/**
 * A do/while statement.
 */
export interface DoWhileStatement extends Statement<"DoWhileStatement"> {
    body: Statement;
    test: Expression;
};

export function DoWhileStatement(body: Statement, test: Expression): DoWhileStatement {
    return createEstreeNode("DoWhileStatement", { test, body });
}

/**
 * A for statement.
 */
export interface ForStatement extends Statement<"ForStatement"> {
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
};
export type ForStatementOptions = Partial<Pick<ForStatement, "init" | "test" | "update">>;

export function ForStatement(body: Statement, options: ForStatementOptions = Object.create(null)): ForStatement {
    const { init = null, test = null, update = null } = options;

    return createEstreeNode("ForStatement", { body, init, test, update });
}

/**
 * A for/in statement.
 */
export interface ForInStatement<T extends "ForOfStatement" | "ForInStatement" = "ForInStatement"> extends Statement<T> {
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
};

export function ForInStatement(left: VariableDeclaration | Pattern, right: Expression, body: Statement): ForInStatement {
    return createEstreeNode("ForInStatement", { left, right, body });
}

/**
 * A function declaration. Note that unlike in the parent interface Function, the id cannot be null.
 */
export interface FunctionDeclaration extends Omit<Function<"FunctionDeclaration">, "id">, Declaration<"FunctionDeclaration"> {
    id: Identifier;
};

export type FunctionDeclarationOptions = Pick<Function, "body" | "params" | "generator" | "async">;

export function FunctionDeclaration(id: Identifier, options: FunctionDeclarationOptions = Object.create(null)): FunctionDeclaration {
    const { body, async, generator, params } = options;

    return createEstreeNode("FunctionDeclaration", { id, body, params, async, generator });
}

/**
 * A variable declaration.
 * @note
 * - "let" & "const" added in ES2015
 */
type VariableKind = "var" | "let" | "const";

export interface VariableDeclaration extends Declaration<"VariableDeclaration"> {
    declarations: VariableDeclarator[];
    kind: VariableKind;
};

export function VariableDeclaration(declarations: VariableDeclarator[], kind: VariableKind = "var"): VariableDeclaration {
    return createEstreeNode("VariableDeclaration", { declarations, kind });
}

/**
 * A variable declarator.
 */
export interface VariableDeclarator extends Node<"VariableDeclarator"> {
    id: Pattern;
    init: Expression | null;
};

export function VariableDeclarator(id: Pattern, init?: Expression | null): VariableDeclarator {
    return createEstreeNode("VariableDeclarator", { id, init: init ?? null });
}

/**
 * A this expression.
 */
export interface ThisExpression extends Expression<"ThisExpression"> {};

export function ThisExpression(): ThisExpression {
    return createEstreeNode("ThisExpression");
}

/**
 * An array expression. An element might be null if it represents a hole in a sparse array. E.g. [1,,2].
 * 
 * @note
 * - added SpreadElement in ES2015
 */
export interface ArrayExpression extends Expression<"ArrayExpression"> {
    elements: (Expression | SpreadElement | null)[];
};

export function ArrayExpression(elements: (Expression | null)[]): ArrayExpression {
    return createEstreeNode("ArrayExpression", { elements });
}

/**
 * An object expression.
 * 
 * @note
 * - added SpreadElement to properties type in ES2018
 */
export interface ObjectExpression extends Expression<"ObjectExpression"> {
    properties: (Property | SpreadElement)[];
};

export function ObjectExpression(properties: (Property | SpreadElement)[] = []): ObjectExpression {
    return createEstreeNode("ObjectExpression", { properties });
}

/**
 * A literal property in an object expression can have either a string or number as its value.
 * Ordinary property initializers have a kind value "init"; getters and setters have the kind values "get" and "set", respectively.
 * 
 * @note
 * - added method, shorthand and computed in ES2015
 * - added Expression type for key in ES2015
 */
export interface Property extends Node<"Property"> {
    key: Expression | Literal | Identifier;
    value: Expression;
    kind: PropertyKind;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
};

type PropertyKind = "init" | "get" | "set";
export type PropertyOptions = Pick<Property, "kind" | "method" | "shorthand" | "computed">;

export function Property(key: Expression | Literal | Identifier, value: Expression, options: PropertyOptions = Object.create(null)): Property {
    const { kind, method, shorthand, computed } = options;

    return createEstreeNode("Property", { key, value, kind, method, shorthand, computed });
}

/**
 * A function expression.
 */
export interface FunctionExpression extends Function<"FunctionExpression">, Expression<"FunctionExpression"> {};

export function FunctionExpression(options: FunctionDeclarationOptions = Object.create(null)): FunctionExpression {
    const { body, async, generator, params } = options;

    return createEstreeNode("FunctionExpression", { id: null, body, async, generator, params });
}

// A unary operator token.
export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

// An update (increment or decrement) operator token.
export type UpdateOperator = "++" | "--";

/**
 * A binary operator token.
 * @note
 * - "**" added in ES2016
 */
export type BinaryOperator =
    "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" |
    "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" |
    "^" | "&" | "in" | "instanceof" | "**";

/**
 * An assignment operator token.
 * @note
 * - "**=" added in ES2016
 * - "||=" | "&&=" | "??=" added in ES2021
 */
export type AssignmentOperator =
    "=" | "+=" | "-=" | "*=" | "/=" | "%=" |
    "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" |
    "**=" | "||=" | "&&=" | "??=";

// A logical operator token.
export type LogicalOperator = "||" | "&&";

/**
 * A unary operator expression.
 */
export interface UnaryExpression extends Expression<"UnaryExpression"> {
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
};

export function UnaryExpression(operator: UnaryOperator, prefix: boolean, argument: Expression): UnaryExpression {
    return createEstreeNode("UnaryExpression", { operator, prefix, argument });
}

/**
 * An update (increment or decrement) operator expression.
 */
export interface UpdateExpression extends Expression<"UpdateExpression"> {
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
};

export function UpdateExpression(operator: UpdateOperator, prefix: boolean, argument: Expression): UpdateExpression {
    return createEstreeNode("UpdateExpression", { operator, prefix, argument });
}

/**
 * A binary operator expression.
 */
export interface BinaryExpression extends Expression<"BinaryExpression"> {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
};

export function BinaryExpression(operator: BinaryOperator, left: Expression, right: Expression): BinaryExpression {
    return createEstreeNode("BinaryExpression", { operator, left, right });
}

/**
 * An assignment operator expression.
 * 
 * @note
 * - removed Expression to "left" type in ES2015.
 */
export interface AssignmentExpression extends Expression<"AssignmentExpression"> {
    operator: AssignmentOperator;
    left: Pattern;
    right: Expression;
};

export function AssignmentExpression(operator: AssignmentOperator, left: Pattern | Expression, right: Expression): AssignmentExpression {
    return createEstreeNode("AssignmentExpression", { operator, left, right });
}

/**
 * A logical operator expression.
 */
export interface LogicalExpression extends Expression<"LogicalExpression"> {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
};

export function LogicalExpression(operator: LogicalOperator, left: Expression, right: Expression): LogicalExpression {
    return createEstreeNode("LogicalExpression", { operator, left, right });
}

/**
 * A member expression. If computed is true, the node corresponds to a computed (a[b]) member expression and property is an Expression.
 * If computed is false, the node corresponds to a static (a.b) member expression and property is an Identifier.
 * 
 * @note
 * - added Super in ES2015
 * - added ChainElement & optional in ES2020
 */
export interface MemberExpression extends Expression<"MemberExpression">, Pattern<"MemberExpression">, ChainElement<"MemberExpression"> {
    object: Expression | Super;
    property: Expression;
    computed: boolean;
};

export function MemberExpression(object: Expression | Super, property: Expression, computed: boolean = false, optional: boolean = false): MemberExpression {
    return createEstreeNode("MemberExpression", { object, property, computed, optional });
}

/**
 * A conditional expression, i.e., a ternary ?/: expression.
 */
export interface ConditionalExpression extends Expression<"ConditionalExpression"> {
    test: Expression;
    alternate: Expression;
    consequent: Expression;
};

export function ConditionalExpression(test: Expression, alternate: Expression, consequent: Expression): ConditionalExpression {
    return createEstreeNode("ConditionalExpression", { test, alternate, consequent });
}

type ExpressionSpreadArray = (Expression | SpreadElement)[];

/**
 * A function or method call expression.
 * @note
 * - added Super in callee type in ES2015
 * - added SpreadElement in arguments type in ES2015
 * - added ChainElement & optional in ES2020
 */
export interface CallExpression extends Expression<"CallExpression">, ChainElement<"CallExpression"> {
    callee: Expression |  Super;
    arguments: ExpressionSpreadArray;
};

export function CallExpression(callee: Expression | Super, args: ExpressionSpreadArray = [], optional: boolean = false): CallExpression {
    return createEstreeNode("CallExpression", { callee, arguments: args, optional });
}

/**
 * A new expression.
 * 
 * @note
 * - added SpreadElement in arguments type in ES2015
 */
export interface NewExpression extends Expression<"NewExpression"> {
    callee: Expression;
    arguments: ExpressionSpreadArray;
};

export function NewExpression(callee: Expression, args: ExpressionSpreadArray = []): NewExpression {
    return createEstreeNode("NewExpression", { callee, arguments: args });
}

/**
 * A new expression.
 */
export interface SequenceExpression extends Expression<"SequenceExpression"> {
    expressions: Expression[];
};

export function SequenceExpression(expressions: Expression[]): SequenceExpression {
    return createEstreeNode("SequenceExpression", { expressions });
}
