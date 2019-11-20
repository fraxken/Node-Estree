"use strict";

// Require Third-party Dependencies
const meriyah = require("meriyah");
const astring = require("astring");

// const nodesRoot = [];
// nodesRoot.push(two.create());

// console.log(JSON.stringify(nodesRoot, null, 2))

// for (const node of nodesRoot) {
//     const code = astring.generate(node);
//     console.log(code);
// }

const code = `var a = 10`;
const { body } = meriyah.parse(code);
console.log(JSON.stringify(body, null, 4));
