"use strict";

// Require Internal Dependencies
const Identifier = require("./Identifier");

class VariableDeclarator {
    constructor(identifier, value = null) {
        this.id = Identifier.stringToIdentifier(identifier);
        if (value !== null) {
            this.init = Reflect.has(value, "toJSON") ? value.toJSON() : value;
        }
    }

    toJSON() {
        const json = {
            type: "VariableDeclarator",
            id: this.id
        };
        if (typeof this.init !== "undefined") {
            json.init = this.init;
        }

        return json;
    }
}

module.exports = VariableDeclarator;
