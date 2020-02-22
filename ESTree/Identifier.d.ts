declare namespace Identifier {
    export interface JSON {
        type: "Identifier";
        name: string;
    }
}

declare class Identifier {
    static isIdentifier(value: any): boolean;
    static stringToIdentifier(value: any): Identifier.JSON;
    constructor(name: string);

    name: string;
    toJSON(): Identifier.JSON;
}

export = Identifier;
export as namespace Identifier;
