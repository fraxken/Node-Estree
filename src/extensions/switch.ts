// Import Internal Dependencies
import {
    Expression, Statement, SwitchStatement, Variant, SwitchCase, LiteralValue, Literal, BreakStatement
} from "../estree/index";
import { isLiteral } from "../utils";

// CONSTANTS
const kBreakableVariants = new Set(["BreakStatement", "ReturnStatement"]);

export interface SwitchOptions {
    autoBreak?: boolean;
}

export class Switch {
    public discriminant: Expression<Variant>;
    public cases: SwitchCase[] = [];
    public autoBreak: boolean = false;

    constructor(discriminant: Expression<Variant>, options: SwitchOptions = {}) {
        this.discriminant = discriminant;
        this.autoBreak = options.autoBreak ?? false;
    }

    case(test: Expression<Variant> | LiteralValue, consequent: Statement<Variant>[]) {
        test = (isLiteral(test) ? Literal(test as LiteralValue) : test) as Expression | null;
        if (this.autoBreak && !kBreakableVariants.has(consequent[consequent.length - 1].type)) {
            consequent.push(BreakStatement());
        }

        this.cases.push(SwitchCase(test, consequent))

        return this;
    }

    toJSON() {
        return SwitchStatement(this.discriminant, this.cases);
    }
}
