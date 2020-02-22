"use strict";

// Require Internal Dependencies
const Literal = require("./Literal");
const Identifier = require("./Identifier");
const isExpression = require("./Utils/isExpression");

// CONSTANTS
const kPropertyKinds = new Set(["init", "get", "set"]);

class Property {
    constructor(key, value, options = {}) {
        const { kind = "init", method = true, shorthand = false, computed = false } = options;
        if (!kPropertyKinds.has(kind)) {
            throw new TypeError("kind must be a valid property kind");
        }
        if (!(key instanceof Literal) && !(key instanceof Identifier)) {
            throw new TypeError("key must be an instanceof Identifier or Literal");
        }
        if (!isExpression(value)) {
            throw new TypeError("value must be valid AST Expression");
        }

        this.key = key.toJSON();
        this.value = Reflect.has(value, "toJSON") ? value.toJSON() : value;
        this.kind = kind;
        this.method = method;
        this.shorthand = shorthand;
        this.computed = computed;
    }

    toJSON() {
        return {
            type: "Property",
            key: this.key,
            value: this.value,
            kind: this.kind,
            method: this.method,
            shorthand: this.shorthand,
            computed: this.computed
        };
    }
}

module.exports = Property;
