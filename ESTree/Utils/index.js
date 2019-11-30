"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

function isType(type, obj) {
    if (typeof type !== "string") {
        throw new TypeError("type must be a string");
    }

    if (!is.plainObject(obj) || !Reflect.has(obj, "type")) {
        return false;
    }

    return obj.type === type;
}

module.exports = { isType };

