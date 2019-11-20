"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

class Literal {
    static isLiteralValue(value) {
        return (is.regExp(value) || is.primitive(value)) && !is.undefined(value);
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
