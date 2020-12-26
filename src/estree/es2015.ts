// Import Internal Dependencies
import {
    Node, Expression, Pattern, Statement,
    Literal, Identifier, Property,
    ForInStatement, VariableDeclaration,
    FunctionBody, Function, FunctionExpression, Declaration, FunctionDeclaration
} from "./es5";

import { createEstreeNode } from "../utils";

/**
 * For Of Statement
 * 
 * @note
 * - added await in ES2018
 */
export interface ForOfStatement extends ForInStatement<"ForOfStatement"> {
    await: boolean;
};

export function ForOfStatement(left: VariableDeclaration | Pattern, right: Expression, body: Statement, await: boolean = false): ForOfStatement {
    return createEstreeNode("ForOfStatement", { body, left, right, await });
}

/**
 * A super pseudo-expression.
 */
export interface Super extends Node<"Super"> {};

export function Super(): Super {
    return createEstreeNode("Super");
}

/**
 * Spread expression, e.g., [head, ...iter, tail], f(head, ...iter, ...tail).
 */
export interface SpreadElement extends Node<"SpreadElement"> {
    argument: Expression;
};

export function SpreadElement(argument: Expression): SpreadElement {
    return createEstreeNode("SpreadElement", { argument });
}

/**
 * A fat arrow function expression, e.g., let foo = (bar) => console.log("boo")
 */
export interface ArrowFunctionExpression extends Omit<Function<"ArrowFunctionExpression">, "body">, Expression<"ArrowFunctionExpression"> {
    body: FunctionBody | Expression;
    expression: boolean;
};

export type ArrowFunctionExprOptions = Pick<Function, "params" | "generator" | "async"> & { expression: boolean };

export function ArrowFunctionExpression(body: FunctionBody | Expression, options: ArrowFunctionExprOptions = Object.create(null)): ArrowFunctionExpression {
    const { params, generator, async, expression } = options;
    
    return createEstreeNode("ArrowFunctionExpression", { id: null, body, params, generator, async, expression });
}

/**
 * A yield expression.
 */
export interface YieldExpression extends Expression<"YieldExpression"> {
    argument: Expression | null;
    delegate: boolean;
};

export function YieldExpression(argument: Expression | null, delegate: boolean = false): YieldExpression {
    return createEstreeNode("YieldExpression", { argument, delegate });
}

/**
 * TemplateElement Node
 * 
 * @note
 * - added cooked string | null in ES2018
 */
export interface TemplateElement extends Node<"TemplateElement"> {
    tail: boolean;
    value: {
        cooked: string | null;
        raw: string;
    }
};

export function TemplateElement(cooked: string | null, raw: string, tail: boolean = false): TemplateElement {
    return createEstreeNode("TemplateElement", {
        tail,
        value: { cooked, raw }
    });
}

/**
 * TemplateLiteral
 */
export interface TemplateLiteral extends Expression<"TemplateLiteral"> {
    quasis: TemplateElement[];
    expressions: Expression[];
};

export function TemplateLiteral(quasis: TemplateElement[], expressions: Expression[]): TemplateLiteral {
    return createEstreeNode("TemplateLiteral", { quasis, expressions });
}

/**
 * TaggedTemplateExpression 
 */
export interface TaggedTemplateExpression extends Expression<"TaggedTemplateExpression"> {
    tag: Expression;
    quasi: TemplateLiteral;
};

export function TaggedTemplateExpression(tag: Expression, quasi: TemplateLiteral): TaggedTemplateExpression {
    return createEstreeNode("TaggedTemplateExpression", { tag, quasi });
}

/**
 * AssignmentProperty 
 */
export interface AssignmentProperty extends Omit<Property, "value" | "kind" | "method"> {
    value: Pattern;
    kind: "init";
    method: false;
};

export type AssignmentPropertyOptions = Pick<Property, "shorthand" | "computed">;

export function AssignmentProperty(key: Expression | Literal | Identifier, value: Pattern, options: AssignmentPropertyOptions = Object.create(null)): AssignmentProperty {
    const { shorthand, computed } = options;

    return createEstreeNode("Property", { key, value, kind: "init", method: false, shorthand, computed });
}

/**
 * ObjectPattern 
 * 
 * @note
 * - added RestElement to properties in ES2018
 */
export interface ObjectPattern extends Pattern<"ObjectPattern"> {
    properties: (AssignmentProperty | RestElement)[];
};

export function ObjectPattern(properties: (AssignmentProperty | RestElement)[]): ObjectPattern {
    return createEstreeNode("ObjectPattern", { properties });
}

/**
 * ArrayPattern 
 */
export interface ArrayPattern extends Pattern<"ArrayPattern"> {
    elements: Pattern | null;
};

export function ArrayPattern(elements?: Pattern | null): ArrayPattern {
    return createEstreeNode("ArrayPattern", { elements: elements ?? null });
}

/**
 * RestElement 
 */
export interface RestElement extends Pattern<"RestElement"> {
    argument: Pattern;
};

export function RestElement(argument: Pattern): RestElement {
    return createEstreeNode("RestElement", { argument });
}

/**
 * AssignmentPattern 
 */
export interface AssignmentPattern extends Pattern<"AssignmentPattern"> {
    left: Pattern;
    right: Expression;
};

export function AssignmentPattern(left: Pattern, right: Expression): AssignmentPattern {
    return createEstreeNode("AssignmentPattern", { left, right });
}

/**
 * Class 
 */
export interface Class<T extends "ClassDeclaration" | "ClassExpression"> extends Node<T> {
    id: Identifier | null;
    superClass: Expression | null;
    body: ClassBody;
};

/**
 * ClassBody 
 */
export interface ClassBody extends Node<"ClassBody"> {
    body: MethodDefinition[];
};

export function ClassBody(body: MethodDefinition[] = []): ClassBody {
    return createEstreeNode("ClassBody", { body });
}

/**
 * MethodDefinition 
 */
export type MethodDefinitionType = "constructor" | "method" | "get" | "set";
export interface MethodDefinition extends Node<"MethodDefinition"> {
    key: Expression;
    value: FunctionExpression;
    kind: MethodDefinitionType;
    computed: boolean;
    static: boolean;
};

// note: here we use isStatic because "static" is a reserved keyword
export type MethodDefinitionOptions = Pick<MethodDefinition, "kind" | "computed"> & { isStatic: boolean };

export function MethodDefinition(key: Expression, value: FunctionExpression, options: MethodDefinitionOptions = Object.create(null)): MethodDefinition {
    const { kind, computed, isStatic } = options;

    return createEstreeNode("MethodDefinition", { key, value, kind, computed, static: isStatic });
}

/**
 * ClassDeclaration 
 */
export interface ClassDeclaration extends Class<"ClassDeclaration">, Declaration<"ClassDeclaration"> {
    id: Identifier;
};

export function ClassDeclaration(id: Identifier, body: ClassBody, superClass?: Expression | null): ClassDeclaration {
    return createEstreeNode("ClassDeclaration", {
        id, body, superClass: superClass ?? null
    });
}

/**
 * ClassExpression 
 */
export interface ClassExpression extends Class<"ClassExpression">, Expression<"ClassExpression"> {};

export function ClassExpression(id: Identifier, body: ClassBody, superClass?: Expression | null): ClassExpression {
    return createEstreeNode("ClassExpression", {
        id, body, superClass: superClass ?? null
    });
}

/**
 * MetaProperty node represents new.target meta property in ES2015. In the future, it will represent other meta properties as well.
 */
export interface MetaProperty extends Expression<"MetaProperty"> {
    meta: Identifier;
    property: Identifier;
};

export function MetaProperty(meta: Identifier, property: Identifier): MetaProperty {
    return createEstreeNode("MetaProperty", { meta, property });
}

export type ModuleDeclarationType = "ImportDeclaration" | "ExportNamedDeclaration" | "ExportDefaultDeclaration" | "ExportAllDeclaration";
export type ModuleSpecifierType = "ImportSpecifier" | "ImportDefaultSpecifier" | "ImportNamespaceSpecifier" | "ExportSpecifier";

/**
 * A module import or export declaration.
 */
export interface ModuleDeclaration<T extends ModuleDeclarationType> extends Node<T> {};

/**
 * A specifier in an import or export declaration.
 */
export interface ModuleSpecifier<T extends ModuleSpecifierType> extends Node<T> {
    local: Identifier;
};

/**
 * An import declaration, e.g., import foo from "mod";. 
 */
export interface ImportDeclaration extends ModuleDeclaration<"ImportDeclaration"> {
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[];
    source: Literal;
};

export function ImportDeclaration(specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[], source: Literal): ImportDeclaration {
    return createEstreeNode("ImportDeclaration", { specifiers, source });
}

/**
 * An imported variable binding, e.g., {foo} in import {foo} from "mod" or {foo as bar} in import {foo as bar} from "mod".
 * 
 * @see https://github.com/estree/estree/blob/master/es2015.md#importspecifier
 */
export interface ImportSpecifier extends ModuleSpecifier<"ImportSpecifier"> {
    imported: Identifier;
};

export function ImportSpecifier(imported: Identifier, local: Identifier): ImportSpecifier {
    return createEstreeNode("ImportSpecifier", { imported, local });
}

/**
 * A default import specifier, e.g., foo in import foo from "mod.js".
 */
export interface ImportDefaultSpecifier extends ModuleSpecifier<"ImportDefaultSpecifier"> {};

export function ImportDefaultSpecifier(local: Identifier): ImportDefaultSpecifier {
    return createEstreeNode("ImportDefaultSpecifier", { local });
}

/**
 * A namespace import specifier, e.g., * as foo in import * as foo from "mod.js".
 */
export interface ImportNamespaceSpecifier extends ModuleSpecifier<"ImportNamespaceSpecifier"> {};

export function ImportNamespaceSpecifier(local: Identifier): ImportNamespaceSpecifier {
    return createEstreeNode("ImportNamespaceSpecifier", { local });
}

/**
 * An export named declaration, e.g., export {foo, bar};, export {foo} from "mod"; or export var foo = 1;
 * 
 * Note: Having declaration populated with non-empty specifiers or non-null source results in an invalid state.
 */
export interface ExportNamedDeclaration extends ModuleDeclaration<"ExportNamedDeclaration"> {
    declaration: Declaration | null;
    specifiers: any[];
    source: Literal | null;
};

export function ExportNamedDeclaration(declaration: Declaration | null, specifiers: any[], source?: Literal | null): ExportNamedDeclaration {
    return createEstreeNode("ExportNamedDeclaration", {
        declaration, specifiers, source: source ?? null
    });
}

/**
 * An exported variable binding, e.g., {foo} in export {foo} or {bar as foo} in export {bar as foo}.
 * 
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportspecifier
 */
export interface ExportSpecifier extends ModuleSpecifier<"ExportSpecifier"> {
    exported: Identifier;
};

export function ExportSpecifier(exported: Identifier, local: Identifier): ExportSpecifier {
    return createEstreeNode("ExportSpecifier", { exported, local });
}

/**
 * ExportDefaultDeclaration
 */
export interface AnonymousDefaultExportedFunctionDeclaration extends Function {
    type: "FunctionDeclaration";
    id: null;
}

export interface AnonymousDefaultExportedClassDeclaration extends Class<"ClassDeclaration"> {
    type: "ClassDeclaration";
    id: null;
}

type ExportDefaultDeclarationType =
    AnonymousDefaultExportedFunctionDeclaration | AnonymousDefaultExportedClassDeclaration |
    FunctionDeclaration | ClassDeclaration | Expression;

export interface ExportDefaultDeclaration extends ModuleDeclaration<"ExportDefaultDeclaration"> {
    declaration: ExportDefaultDeclarationType;
};

export function ExportDefaultDeclaration(declaration: ExportDefaultDeclarationType): ExportDefaultDeclaration {
    return createEstreeNode("ExportDefaultDeclaration", { declaration });
}

/**
 * An export batch declaration, e.g., export * from "mod";.
 * 
 * @note
 * - added exported in ES2020
 */
export interface ExportAllDeclaration extends ModuleDeclaration<"ExportAllDeclaration"> {
    exported: Identifier | null;
    source: Literal;
};

export function ExportAllDeclaration(source: Literal, exported: Identifier | null): ExportAllDeclaration {
    return createEstreeNode("ExportAllDeclaration", {
        source, exported: exported ?? null
    });
}
