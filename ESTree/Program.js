"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependencies
const { CreateComment } = require("./Helpers");

class Program {
    constructor(sourceType = "script") {
        if (typeof sourceType !== "string") {
            throw new TypeError("sourceType must be a string");
        }

        this.body = [];
        this.sourceType = sourceType;
    }

    add(element, options = Object.create(null)) {
        const { comments = [] } = options;
        const node = is.plainObject(element) ? element : element.toJSON();
        if (comments.length > 0) {
            node.comments = comments.map((curr) => (typeof curr === "string" ? CreateComment("Line", curr) : curr));
        }
        this.body.push(node);

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
