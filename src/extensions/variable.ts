// Import Internal Dependencies
import { Identifier, Expression, VariableKind, VariableDeclarator, VariableDeclaration, LiteralValue, Literal } from "../estree/index";
import { toIdentifier, isLiteral } from "../utils";

export interface VarDeclarationOptions {
    kind?: VariableKind;
}

export class VarDeclaration {
    public kind: VariableKind;
    public declarations: VariableDeclarator[] = [];

    static Declare(id: string | Identifier, init: Expression | null, kind: VariableKind = "let") {
        const declarator = VariableDeclarator(toIdentifier(id), init);
        
        return VariableDeclaration([declarator], kind);
    }

    static const(id: string | Identifier, init: Expression | null) {
        return VarDeclaration.Declare(id, init, "const");
    }

    static let(id: string | Identifier, init: Expression | null) {
        return VarDeclaration.Declare(id, init, "let");
    }

    static var(id: string | Identifier, init: Expression | null) {
        return VarDeclaration.Declare(id, init, "var");
    }

    constructor(options: VarDeclarationOptions = Object.create(null)) {
        this.kind = options.kind ?? "let";
    }

    declare(id: string | Identifier, init: Expression | null) {
        this.declarations.push(VariableDeclarator(toIdentifier(id), init))

        return this;
    }

    declareEx(id: string | Identifier, init: Expression | LiteralValue | null) {
        init = (isLiteral(init) ? Literal(init as LiteralValue) : init) as Expression | null;
        this.declarations.push(VariableDeclarator(toIdentifier(id), init))

        return this;
    }

    toJSON() {
        return VariableDeclaration(this.declarations, this.kind);
    }
}
