"use strict";

// Require Internal Dependencies
const Identifier = require("./Identifier");

class VariableDeclarator {
    constructor(identifier, value) {
        if (!(identifier instanceof Identifier)) {
            throw new TypeError("identifier must be a valid instance of Identifier");
        }

        this.id = identifier.toJSON();
        this.init = value.toJSON();
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
