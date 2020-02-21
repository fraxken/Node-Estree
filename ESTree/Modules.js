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

function ImportDeclaration(specifiers = [], source) {
    // eslint-disable-next-line no-param-reassign
    source = typeof source === "string" ? new Literal(source) : source;

    return {
        type: "ImportDeclaration",
        specifiers: specifiers.map((spe) => (typeof spe === "string" ? ImportDefaultSpecifier(spe) : spe)),
        source: source.toJSON()
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
        source
    };
}

function ExportDefaultDeclaration(declaration) {
    return {
        type: "ExportDefaultDeclaration", declaration
    };
}

function ExportAllDeclaration(source) {
    return {
        type: "ExportAllDeclaration",
        source: typeof source === "string" ? new Literal(source).toJSON() : source
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
