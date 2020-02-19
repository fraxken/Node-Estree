"use strict";

const Expression = require("./ESTree/Expression");
const FunctionDeclaration = require("./ESTree/FunctionDeclaration");
const Identifier = require("./ESTree/Identifier");
const Literal = require("./ESTree/Literal");
const Modules = require("./ESTree/Modules");
const Program = require("./ESTree/Program");
const Property = require("./ESTree/Property");
const Statements = require("./ESTree/Statements");
const SwitchStatement = require("./ESTree/SwitchStatement");
const VariableDeclaration = require("./ESTree/VariableDeclaration");
const VariableDeclarator = require("./ESTree/VariableDeclarator");
const Utils = require("./ESTree/Utils");

module.exports = {
    Expression,
    FunctionDeclaration,
    Identifier,
    Literal,
    Modules,
    Program,
    Property,
    Statements,
    SwitchStatement,
    VariableDeclaration,
    VariableDeclarator,
    Utils
};
