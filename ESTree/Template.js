"use strict";

function TemplateLiteral(quasis = [], expressions = []) {
    return {
        type: "TemplateLiteral",
        quasis,
        expressions
    };
}

function TaggedTemplateExpression(tag, quasi) {
    return {
        type: "TaggedTemplateExpression", tag, quasi
    };
}

function TemplateElement(tail = false, cooked, raw = cooked) {
    return {
        type: "TemplateElement",
        tail,
        value: { raw, cooked }
    };
}

module.exports = {
    TemplateLiteral,
    TaggedTemplateExpression,
    TemplateElement
};
