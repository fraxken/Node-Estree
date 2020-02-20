"use strict";

// Require Internal Dependency
const Property = require("./Property");

function AssignmentProperty(key, value) {
    return new Property(key, value, { method: false, shorthand: true }).toJSON();
}

function ObjectPattern(properties = []) {
    return {
        type: "ObjectPattern",
        properties
    };
}

function ArrayPattern(elements = []) {
    return {
        type: "ArrayPattern",
        elements
    };
}

function RestElement(arg) {
    return {
        type: "RestElement",
        argument: arg
    };
}

function AssignmentPattern(left, right) {
    return {
        type: "AssignmentPattern", left, right
    };
}

module.exports = {
    AssignmentProperty,
    ObjectPattern,
    ArrayPattern,
    RestElement,
    AssignmentPattern
};
