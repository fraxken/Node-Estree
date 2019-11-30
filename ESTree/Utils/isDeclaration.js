"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependencies
const Declaration = require("../Abstract/Declaration");

// CONSTANTS
const kAvailableDeclaration = new Set([
    "FunctionDeclaration",
    "VariableDeclaration"
]);

function isDeclaration(obj) {
    if (obj instanceof Declaration) {
        return true;
    }
    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return kAvailableDeclaration.has(obj.type);
}

module.exports = isDeclaration;
