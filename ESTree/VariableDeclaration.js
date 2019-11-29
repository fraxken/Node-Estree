"use strict";

// Require Internal Dependencies
const VariableDeclarator = require("./VariableDeclarator");

// CONSTANTS
const kValidKind = new Set(["var", "let", "const"]);

class VariableDeclaration {
    constructor(kind) {
        if (!kValidKind.has(kind)) {
            throw new Error("invalid variable kind");
        }

        this.kind = kind;
        this.declarations = [];
    }

    declare(declarator) {
        if (!(declarator instanceof VariableDeclarator)) {
            throw new TypeError("declarator must be an instanceof VariableDeclarator");
        }
        this.declarations.push(declarator.toJSON());

        return this;
    }

    toJSON() {
        return {
            type: "VariableDeclaration",
            kind: this.kind,
            declarations: this.declarations
        };
    }
}

module.exports = VariableDeclaration;
