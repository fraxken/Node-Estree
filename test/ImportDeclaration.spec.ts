// Import Third-party Dependencies
import * as astring from "astring";

// Import Internals
import { ESTree } from "../src/index";

// Import Utils
import { createLineProgram } from "./utils";

type Specifiers = (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[];

function buildImportDeclaration(source: string, specifiers: Specifiers = []) {
    return ESTree.ImportDeclaration(specifiers, ESTree.Literal(source));
}

test("ImportDeclaration", () => {
    const source = "./foo";
    const node = buildImportDeclaration("./foo", [
        ESTree.ImportNamespaceSpecifier(ESTree.Identifier("foo"))
    ]);

    expect(node.type).toStrictEqual("ImportDeclaration");
    expect(node.source).toStrictEqual(ESTree.Literal(source));
    expect(Array.isArray(node.specifiers)).toStrictEqual(true);
    expect(node.loc).toStrictEqual(null);
});

test("ImportDeclaration::ImportNamespaceSpecifier", () => {
    const node = buildImportDeclaration("./foo", [
        ESTree.ImportNamespaceSpecifier(ESTree.Identifier("foo"))
    ]);

    const program = createLineProgram(node, false);
    expect(astring.generate(program)).toStrictEqual("import * as foo from \"./foo\";\n");
});

test("ImportDeclaration::ImportDefaultSpecifier", () => {
    const node = buildImportDeclaration("./foo", [
        ESTree.ImportDefaultSpecifier(ESTree.Identifier("foo"))
    ]);

    const program = createLineProgram(node, false);
    expect(astring.generate(program)).toStrictEqual("import foo from \"./foo\";\n");
});

test("ImportDeclaration::ImportSpecifier", () => {
    const node = buildImportDeclaration("./foo", [
        ESTree.ImportSpecifier(ESTree.Identifier("foo"), ESTree.Identifier("foo"))
    ]);

    const program = createLineProgram(node, false);
    expect(astring.generate(program)).toStrictEqual("import {foo} from \"./foo\";\n");
});
