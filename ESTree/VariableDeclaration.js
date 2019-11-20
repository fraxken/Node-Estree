"use strict";

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

    toJSON() {
        return {
            type: "VariableDeclaration",
            kind: this.kind
        };
    }
}

module.exports = VariableDeclaration;
