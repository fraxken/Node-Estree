// Import Internals
import { ESTree } from "../../src/index";

import { AutoChain } from '../../src/helpers'

export function pickOne<A, B>(left: A, right: B): A | B {
    return Math.random() > 0.5 ? left : right;
}

export function createLineProgram(node: ESTree.ProgramBodyItem, withExpr: boolean = true) {
    return ESTree.Program("module", [withExpr ? ESTree.ExpressionStatement(node) : node])
}

export function createGeneratorProgram(nodes: IterableIterator<ESTree.ProgramBodyItem>) {
    return ESTree.Program("module", [...nodes])
}

export function logNative(body) {
    return ESTree.CallExpression(AutoChain("console", "log"), body);
}

export function log(message) {
    return logNative([ESTree.Literal(message)]);
}
