"use strict";

// Require Internal Dependencies
const Identifier = require("./Identifier");
const Literal = require("./Literal");
const Property = require("./Property");
const { Expression } = require("./Statements");
const { CallExpression, ObjectExpression } = require("./Expression");

function CreateMemberExpr(...arr) {
    if (arr.length === 0) {
        throw new Error("unable to process an empty array!");
    }
    const last = arr.pop();
    const property = Array.isArray(last) ?
        CallExpression(typeof last[0] === "string" ? new Identifier(last[0]).toJSON() : last[0], last[1] || []) :
        new Identifier(last).toJSON();

    if (arr.length === 0) {
        return property;
    }
    else if (arr.length === 1) {
        const object = Array.isArray(arr[0]) ?
            CallExpression(typeof arr[0][0] === "string" ? new Identifier(arr[0][0]).toJSON() : arr[0][0], arr[0][1] || []) :
            new Identifier(arr[0]).toJSON();

        return {
            type: "MemberExpression",
            object,
            computed: false,
            property
        };
    }

    return {
        type: "MemberExpression",
        object: CreateMemberExpr(...arr),
        computed: false,
        property
    };
}

function CreateComment(type = "Line", value = "") {
    return { type, value };
}

function CreateSimpleObject(entries) {
    const properties = [];
    for (const [key, value] of entries) {
        const property = new Property(new Identifier(key), new Literal(value), {
            method: false
        }).toJSON();
        properties.push(property);
    }

    return ObjectExpression(properties);
}

function FastCall(predicate = null, members) {
    const intermediateExpr = (...args) => (predicate === null ? CallExpression(...args) : predicate(CallExpression(...args)));

    return (...args) => Expression(intermediateExpr(
        ...(members.length > 0 ? [CreateMemberExpr(...members), ...args] : args)
    ));
}

module.exports = {
    CreateComment,
    CreateSimpleObject,
    CreateMemberExpr,
    FastCall
};
