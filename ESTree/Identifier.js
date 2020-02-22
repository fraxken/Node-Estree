"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

class Identifier {
    static isIdentifier(value) {
        if (value instanceof Identifier) {
            return true;
        }

        return is.plainObject(value) && value.type === "Identifier";
    }

    static stringToIdentifier(value) {
        if (is.nullOrUndefined(value)) {
            throw new TypeError("value cannot be undefined or null");
        }
        if (value instanceof Identifier) {
            return value.toJSON();
        }

        return typeof value === "string" ? new Identifier(value).toJSON() : value;
    }

    constructor(name) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }

        this.name = name;
    }

    toJSON() {
        return {
            type: "Identifier",
            name: this.name
        };
    }
}

module.exports = Identifier;
