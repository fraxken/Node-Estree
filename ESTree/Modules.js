/* eslint-disable no-param-reassign */
/* eslint-disable no-extra-parens */
"use strict";

// Require Internal Dependencies
const Literal = require("./Literal");
const Identifier = require("./Identifier");
const { isExpression } = require("./Utils");

function ImportExpression(expression) {
    if (!isExpression) {
        throw new Error("expression must be a valid Expression");
    }

    return { type: "ImportExpression", expression };
}

function ImportSpecifier(imported, local) {
    const localImported = Identifier.stringToIdentifier(imported);
    const localLocal = Identifier.stringToIdentifier(local);

    return {
        type: "ImportSpecifier",
        imported: localImported,
        local: localLocal || localImported
    };
}

function ImportDefaultSpecifier(local) {
    return {
        type: "ImportDefaultSpecifier",
        local: Identifier.stringToIdentifier(local)
    };
}

function ImportNamespaceSpecifier(local) {
    return {
        type: "ImportNamespaceSpecifier",
        local: Identifier.stringToIdentifier(local)
    };
}

function ImportDeclaration(source, specifiers = []) {
    return {
        type: "ImportDeclaration",
        specifiers: specifiers.map((spe) => (typeof spe === "string" ? ImportDefaultSpecifier(spe) : spe)),
        source: Literal.stringToLiteral(source)
    };
}

function ExportSpecifier(exported, local) {
    const localExported = Identifier.stringToIdentifier(exported);
    const localLocal = Identifier.stringToIdentifier(local);

    return {
        type: "ExportSpecifier",
        exported: localExported,
        local: localLocal || localImported
    };
}

function ExportNamedDeclaration(declaration = null, specifiers = [], source = null) {
    return {
        type: "ExportNamedDeclaration",
        declaration,
        specifiers,
        source: source === null ? null : Literal.stringToLiteral(source)
    };
}

function ExportDefaultDeclaration(declaration) {
    declaration = typeof declaration === "string" ? new Identifier(declaration).toJSON() : declaration;

    return {
        type: "ExportDefaultDeclaration",
        declaration
    };
}

function ExportAllDeclaration(source) {
    return {
        type: "ExportAllDeclaration",
        source: Literal.stringToLiteral(source)
    };
}

module.exports = {
    ImportExpression,
    ImportSpecifier,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportDeclaration,
    ExportSpecifier,
    ExportNamedDeclaration,
    ExportDefaultDeclaration,
    ExportAllDeclaration
};
