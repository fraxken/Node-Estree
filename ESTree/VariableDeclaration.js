"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");
const argc = require("@slimio/arg-checker");

// Require Internal Dependencies
const VariableDeclarator = require("./VariableDeclarator");
const Identifier = require("./Identifier");
const Literal = require("./Literal");

// CONSTANTS
const kValidKind = new Set(["var", "let", "const"]);

class VariableDeclaration {
    static createOne(kind = "let", id, init) {
        argc(kind, is.string);
        argc(id, is.string);
        argc(init, is.string);

        return new VariableDeclaration(kind)
            .declare(new VariableDeclarator(new Identifier(id), new Literal(init)));
    }

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
