"use strict";

class Identifier {
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
