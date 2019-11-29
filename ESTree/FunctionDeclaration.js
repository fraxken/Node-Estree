"use strict";

// Require Internal Dependencies
const Identifier = require("./Identifier");
const { Block } = require("./Statements");

class FunctionDeclaration {
    // eslint-disable-next-line max-params
    constructor(name, params = [], body = [], options = {}) {
        const { expression = false, generator = false, async = false } = options;

        this.id = typeof name === "string" ? new Identifier(name) : null;
        this.params = params;
        this.body = Block(body);

        // Assign parameters!
        this.expression = expression;
        this.generator = generator;
        this.async = async;
    }
}

module.exports = FunctionDeclaration;

