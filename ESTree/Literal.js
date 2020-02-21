"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

class Literal {
    static isLiteralValue(value) {
        return (is.regExp(value) || is.primitive(value)) && !is.undefined(value);
    }

    static stringToIdentifier(value) {
        if (is.nullOrUndefined(value)) {
            throw new TypeError("value cannot be undefined or null");
        }

        return typeof value === "string" ? new Literal(value).toJSON() : value;
    }

    constructor(value) {
        if (!Literal.isLiteralValue(value)) {
            throw new TypeError("value is not a valid literal");
        }

        this.value = value;
    }

    toJSON() {
        return {
            type: "Literal",
            value: this.value
        };
    }
}

module.exports = Literal;
