declare namespace Modules {
    export interface ImportDeclaration extends NodeESTree.Expr<"ImportDeclaration"> {
        specifiers: AllSpecifier[];
        source: Literal;
    }

    export interface ImportExpression extends NodeESTree.Expr<"ImportExpression"> {
        expression: NodeESTree.Expr<any>;
    }

    export interface Specifier<T> extends NodeESTree.Expr<T> {
        local: Identifier;
    }

    export interface ImportSpecifier extends Specifier<"ImportSpecifier"> {
        imported: Identifier;
    }

    export type AllSpecifier = ImportSpecifier | Specifier<"ImportDefaultSpecifier"> | Specifier<"ImportNamespaceSpecifier">;

    export interface ExportSpecifier extends NodeESTree.Expr<"ExportSpecifier"> {
        exported: Identifier;
        local: Identifier;
    }

    export interface ExportAllDeclaration extends NodeESTree.Expr<"ExportAllDeclaration"> {
        source: Literal;
    }

    export interface ExportDefaultDeclaration extends NodeESTree.Expr<"ExportDefaultDeclaration"> {
        declaration: any;
    }

    export interface ExportNamedDeclaration extends NodeESTree.Expr<"ExportNamedDeclaration"> {
        declaration: any;
        specifiers: ExportSpecifier[];
        source: null | Literal;
    }

    export function ImportExpression(expression: NodeESTree.Expr<any>): ImportExpression;
    export function ImportSpecifier(imported: NodeESTree.Identifier, local: NodeESTree.Identifier): ImportSpecifier;
    export function ImportDefaultSpecifier(local: NodeESTree.Identifier): Specifier<"ImportDefaultSpecifier">;
    export function ImportNamespaceSpecifier(local: NodeESTree.Identifier): Specifier<"ImportNamespaceSpecifier">;
    export function ImportDeclaration(specifiers?: (string | AllSpecifier)[], source: NodeESTree.Literal): ImportDeclaration;
    export function ExportSpecifier(exported: NodeESTree.Identifier, local: NodeESTree.Identifier): ExportSpecifier;
    export function ExportNamedDeclaration(declaration?: any, specifiers?: ExportSpecifier[], source: null | NodeESTree.Literal): ExportNamedDeclaration;
    export function ExportDefaultDeclaration(declaration: any): ExportDefaultDeclaration;
    export function ExportAllDeclaration(source: NodeESTree.Literal): ExportAllDeclaration;
}

export = Modules;
export as namespace Modules;
