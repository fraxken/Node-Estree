"use strict";

// Require Internal Dependencies
const { isExpression, isStatement } = require("./Utils");

class Switch {
    constructor(discriminant) {
        if (!isExpression(discriminant)) {
            throw new TypeError("discriminant must be a valid AST Expression");
        }

        this.discriminant = discriminant;
        this.cases = [];
    }

    case(test = null, stmt) {
        if (test !== null && !isExpression(test)) {
            throw new TypeError("test must be a valid AST Expression");
        }
        if (!isStatement(stmt)) {
            throw new TypeError("stmt must be a valid AST Statement");
        }

        const SwitchCase = {
            type: "SwitchCase",
            test,
            consequent: [stmt]
        };
        this.cases.push(SwitchCase);

        return this;
    }

    default(stmt) {
        return this.case(null, stmt);
    }

    toJSON() {
        return {
            type: "SwitchStatement",
            discriminant: this.discriminant,
            cases: this.cases
        };
    }
}

module.exports = Switch;
