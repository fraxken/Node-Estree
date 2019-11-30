"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

class Program {
    constructor(sourceType = "script") {
        if (typeof sourceType !== "string") {
            throw new TypeError("sourceType must be a string");
        }

        this.body = [];
        this.sourceType = sourceType;
    }

    add(element) {
        this.body.push(is.plainObject(element) ? element : element.toJSON());

        return this;
    }

    toJSON() {
        return {
            type: "Program",
            body: JSON.parse(JSON.stringify(this.body)),
            sourceType: this.sourceType
        };
    }
}

module.exports = Program;
