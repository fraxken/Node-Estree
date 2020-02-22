/// <reference path="../global.d.ts" />

declare namespace Program {
    export type SourceType = "script" | "module";

    export interface AddOptions {
        comments: (string | NodeESTree.Comment)[];
    }

    export interface AST {
        type: "Program";
        body: object;
        sourceType: SourceType;
    }
}

declare class Program {
    constructor(sourceType: Program.SourceType);

    body: NodeESTree.Expr<any>[];
    sourceType: Program.SourceType;

    add(element: any, options?: Program.AddOptions): this;
    toJSON(): Program.AST;
}

export = Program;
export as namespace Program;
