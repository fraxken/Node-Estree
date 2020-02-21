"use strict";

// Require Internal Dependencies
const Declaration = require("./Abstract/Declaration");
const Identifier = require("./Identifier");
const { Block } = require("./Statements");
const { toJSON } = require("./Utils");

class FunctionDeclaration extends Declaration {
    // eslint-disable-next-line max-params
    constructor(name, params = [], body = [], options = {}) {
        super();
        const { expression = false, generator = false, async = false } = options;

        this.id = typeof name === "string" ? new Identifier(name) : null;
        this.params = toJSON(params);
        this.body = Block(toJSON(body));

        // Assign parameters!
        this.expression = expression;
        this.generator = generator;
        this.async = async;
    }

    toJSON() {
        return {
            type: this.id === null && this.expression ? "ArrowFunctionExpression" : "FunctionDeclaration",
            params: this.params,
            body: this.body,
            expression: this.expression,
            generator: this.generator,
            async: this.async
        };
    }
}

module.exports = FunctionDeclaration;

