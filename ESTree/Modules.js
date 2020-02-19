/* eslint-disable no-extra-parens */
"use strict";

// Require Internal Dependencies
const Literal = require("./Literal");
const Identifier = require("./Identifier");

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
    if (!(value instanceof Literal)) {
        throw new TypeError("source must be a Literal value!");
    }

    return {
        type: "ImportDeclaration",
        specifiers: specifiers.map((spe) => (typeof spe === "string" ? ImportDefaultSpecifier(spe) : spe)),
        source
    };
}

module.exports = {
    ImportSpecifier,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportDeclaration
};
