"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependencies
const isDeclaration = require("./isDeclaration");
const isStatement = require("./isStatement");
const isExpression = require("./isExpression");

function isType(type, obj) {
    if (typeof type !== "string") {
        throw new TypeError("type must be a string");
    }

    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return obj.type === type;
}

function toJSON(arr) {
    return arr.map((arg) => (Reflect.has(arg, "toJSON") ? arg.toJSON() : arg));
}

module.exports = {
    isType,
    toJSON,
    isExpression,
    isDeclaration,
    isStatement
};
