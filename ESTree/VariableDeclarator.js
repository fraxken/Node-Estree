"use strict";

// Require Internal Dependencies
const Identifier = require("./Identifier");

class VariableDeclarator {
    constructor(identifier, value) {
        this.id = Identifier.stringToIdentifier(identifier);
        this.init = Reflect.has(value, "toJSON") ? value.toJSON() : value;
    }

    toJSON() {
        return {
            type: "VariableDeclarator",
            id: this.id,
            init: this.init
        };
    }
}

module.exports = VariableDeclarator;
