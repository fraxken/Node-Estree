// Import Third-party Dependencies
import is from "@slimio/is";

// Import Internal Dependencies
import { Node, Variant } from "./estree/es5";

export function createEstreeNode<T extends Variant, K>(variant: T, properties: K = Object.create(null)): Node<T> & K {
    return { type: variant, ...properties, loc: null }
}

export function isLiteral(value: any): boolean {
    return (is.regExp(value) || is.primitive(value)) && !is.undefined(value);
}
